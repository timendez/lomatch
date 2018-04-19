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

module.exports = {
  generateArrayPredicates: generateArrayPredicates,
}
