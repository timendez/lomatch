const _ = require('lodash');

function generateAllCombinations(input) {
  var predicates = [];
  var indices = [];
  _.forEach(input, (val, idx) => {
    _.forEach(_.clone(predicates), (rest, index) => {
      predicates.push([...rest, val]);
      indices.push([...indices[index], idx]);
    });
    predicates.push([val]);
    indices.push([idx]);
  });
  return _.concat(predicates, indices);
}

function generateArrayPredicates(input, output) {
  var i = input.length;
  var predicates = _.concat([output], output, input);
  predicates.push(_.difference(input, [output]));
  predicates.push(_.difference(input, output));
  predicates.push(_.difference(output, input));
  predicates.push(_.intersection(input, Array.isArray(output) ? output : [output]));
  predicates = _.concat(predicates, generateAllCombinations(input));
  while (i-- > -1 * input.length) {
    predicates.push(i);
  }
  return predicates;
}

function generateStringPredicates(input, output) {
  var predicates = [output, input, output.length, input.length, _.words(input), _.words(output)];
  var i = input.length;
  while (i--) {
    var k = i - 1;
    while (k-- > 0) {
      predicates.push(input.substring(k, i));
    }
    predicates.push(input.charAt(i));
  }
  return _.uniq(_.flatten(predicates));
}

function generateObjectPaths(input, output, path, successPaths, allPaths) {
  var addedPath = false;
  if (Array.isArray(input)) {
    _.forEach(input, (inputEle, idx) => {
      _.forEach(output, (outputEle, outputIdx) => {
        if (_.isEqual(outputEle, inputEle)) {
          successPaths.splice(outputIdx, 0, `${path}[${idx}]`);
        }
      });
      allPaths.push(`${path}[${idx}]`);
      generateObjectPaths(inputEle, output, `${path}[${idx}]`, successPaths, allPaths);
    });
  }
  else if (_.isObjectLike(input)) {
    _.forOwn(input, (val, key) => {
      var continuedPath = path.length > 0 ? `${path}.${key}` : key;
      _.forEach(output, (element, outputIdx) => {
        if (_.isEqual(element, val)) {
          successPaths.splice(outputIdx, 0, continuedPath);
        }
      });
      allPaths.push(continuedPath);
      generateObjectPaths(val, output, continuedPath, successPaths, allPaths);
    });
  }
  return {successPaths, allPaths};
}

function generateKeys(input, keys) {
  if (Array.isArray(input)) {
    _.forEach(input, (ele) => {
      if (_.isObjectLike(ele)) {
        generateKeys(ele, keys);
      }
    });
  }
  else if (_.isObjectLike(input)) {
    _.forOwn(input, (val, key) => {
      keys.push(key);
      if (_.isObjectLike(val)) {
        generateKeys(val, keys);
      }
    });
  }
  return keys;
}

function generateValues(input, values) {
  if (Array.isArray(input)) {
    _.forEach(input, (ele) => {
      if (_.isObjectLike(ele)) {
        generateKeys(ele, values);
      }
    });
  }
  else if (_.isObjectLike(input)) {
    _.forOwn(input, (val, key) => {
      values.push(val);
      if (_.isObjectLike(val)) {
        generateKeys(val, values);
      }
    });
  }
  return values;
}

function generateObjectPredicates(input, output) {
  var predicates = [output, input];
  predicates.push(_.omit(input, _.keys(output)));
  predicates.push(_.omit(output, _.keys(input)));
  predicates.push(_.filter(input, output));
  predicates = _.concat(predicates, generateKeys(input, []));
  predicates = _.concat(predicates, generateValues(input, []));
  if (_.isObjectLike(output) && !Array.isArray(output)) {
    predicates.push(_.keys(_.omit(input, _.keys(output))));
    predicates.push(_.keys(_.pick(input, _.keys(output))));
  }
  var generatedObjectPaths = generateObjectPaths(input, Array.isArray(output) ? output : [output], '', [], []);
  predicates = _.concat(predicates, generatedObjectPaths.allPaths);
  predicates.push(generatedObjectPaths.successPaths);
  var i = input.length;
  while (i--) {
    predicates.push(input.charAt(i));
  }
  return _.uniqWith(predicates, _.isEqual);
}

module.exports = {
  generateArrayPredicates: generateArrayPredicates,
  generateStringPredicates: generateStringPredicates,
  generateObjectPredicates: generateObjectPredicates,
}
