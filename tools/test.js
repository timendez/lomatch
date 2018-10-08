const _ = require('lodash');
const iteratees = require('../data/functions.js').iteratees;

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

function testWithIteratees(input, output, func) {
  var successIteratees = [];
  _.forEach(iteratees, iteratee => {
    var clone = _.cloneDeep(input);
    if (_.isEqual(output, func.func(clone, iteratee.func)) || (_.isEqual(output, clone) && !_.isEqual(input, clone))) {
      successIteratees.push(iteratee.name);
    }
  });
  return successIteratees;
}

function testWithMultipleArguments(input, output, predicate1, predicate2, func) {
  var clone1 = _.cloneDeep(input);
  if (_.isEqual(output, func(clone1, predicate1, predicate2)) || (_.isEqual(output, clone1) && !_.isEqual(input, clone1))) {
    return [predicate1, predicate2];
  }
  return 'failure';
}

module.exports = {
  testWithoutPredicate: testWithoutPredicate,
  testWithPredicate: testWithPredicate,
  testWithIteratees: testWithIteratees,
  testWithMultipleArguments: testWithMultipleArguments,
}
