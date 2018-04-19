const _ = require('lodash');

function testWithoutPredicate(input, output, func) {
  var clone = _.cloneDeep(input);
  return _.isEqual(output, func(clone)) || (_.isEqual(output, clone) && !_.isEqual(input, clone));
}

function testWithPredicate(input, output, predicate, func) {
  var clone1 = _.cloneDeep(input);
  var clone2 = _.cloneDeep(input);
  var clone3 = _.cloneDeep(input);
  if (_.isEqual(output, func(clone1, predicate)) || (_.isEqual(output, clone1) && !_.isEqual(input, clone1))) {
    return predicate;
  }
  else if (_.isEqual(output, func(clone2, predicate, 0)) || (_.isEqual(output, clone2) && !_.isEqual(input, clone2))) {
    return [predicate, 0];
  }
  else if (_.isEqual(output, func(clone3, predicate, 0, 0)) || (_.isEqual(output, clone3) && !_.isEqual(input, clone3))) {
    return [predicate, 0, 0];
  }
  return 'failure';
}

module.exports = {
  testWithoutPredicate: testWithoutPredicate,
  testWithPredicate: testWithPredicate,
}
