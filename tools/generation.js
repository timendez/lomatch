const _ = require('lodash');

function generateAllCombinations(input) {
  var args = [];
  var indices = [];
  _.forEach(input, (val, idx) => {
    _.forEach(_.clone(args), (rest, index) => {
      args.push([...rest, val]);
      indices.push([...indices[index], idx]);
    });
    args.push([val]);
    indices.push([idx]);
  });
  return _.concat(args, indices);
}

function generateArrayArgs(input, output) {
  var i = input.length;
  var args = _.concat([output], output, input);
  args.push(_.difference(input, [output]));
  args.push(_.difference(input, output));
  args.push(_.difference(output, input));
  args.push(_.intersection(input, Array.isArray(output) ? output : [output]));
  args = _.concat(args, generateAllCombinations(input));
  while (i-- > -1 * input.length) {
    args.push(i);
  }
  return args;
}

function generateStringArgs(input, output) {
  var args = [output, input, output.length, input.length, _.words(input), _.words(output)];
  var i = input.length;
  while (i--) {
    var k = i - 1;
    while (k-- > 0) {
      args.push(input.substring(k, i));
    }
    args.push(input.charAt(i));
  }
  return _.uniq(_.flatten(args));
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

function generateObjectArgs(input, output) {
  var args = [output, input];
  args.push(_.omit(input, _.keys(output)));
  args.push(_.omit(output, _.keys(input)));
  args.push(_.filter(input, output));
  args = _.concat(args, generateKeys(input, []));
  args = _.concat(args, generateValues(input, []));
  if (_.isObjectLike(output) && !Array.isArray(output)) {
    args.push(_.keys(_.omit(input, _.keys(output))));
    args.push(_.keys(_.pick(input, _.keys(output))));
  }
  var generatedObjectPaths = generateObjectPaths(input, Array.isArray(output) ? output : [output], '', [], []);
  args = _.concat(args, generatedObjectPaths.allPaths);
  args.push(generatedObjectPaths.successPaths);
  var i = input.length;
  while (i--) {
    args.push(input.charAt(i));
  }
  return _.uniqWith(args, _.isEqual);
}

module.exports = {
  generateArrayArgs: generateArrayArgs,
  generateStringArgs: generateStringArgs,
  generateObjectArgs: generateObjectArgs,
}
