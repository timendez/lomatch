const _ = require('lodash');
const functions = require('./functions.js');

function testWithoutPredicate(input, output, func) {
  clone = _.clone(input);
  return _.isEqual(output, func(clone)) || (_.isEqual(output, clone) && !_.isEqual(input, clone));
}

function testWithPredicate(input, output, predicate, func) {
  clone1 = _.clone(input);
  clone2 = _.clone(input);
  clone3 = _.clone(input);
  if (_.isEqual(output, func(clone1, predicate)) || (_.isEqual(output, clone1) && !_.isEqual(input, clone1))) {
    return predicate;
  }
  else if (_.isEqual(output, func(clone2, predicate, 0)) || (_.isEqual(output, clone2) && !_.isEqual(input, clone2))) {
    return [predicate, 0]
  }
  else if (_.isEqual(output, func(clone3, predicate, 0, 0)) || (_.isEqual(output, clone3) && !_.isEqual(input, clone3))) {
    return [predicate, 0, 0];
  }
  return 'failure';
}

function buildNtoTheMaxPredicates(input, predicates) {
  if (_.isEmpty(input)) return;
  predicates.push(input);
  _.forEach(input, (element, idx) => {
    clone = _.clone(input);
    clone.splice(idx, 1);
    buildNtoTheMaxPredicates(clone, predicates);
  });
  return _.uniqWith(predicates, _.isEqual);
}

function generateArrayPredicates(input, output) {
  var i = input.length;
  var predicates = _.concat([output], output, input);
  predicates.push(_.difference(input, [output]));
  predicates.push(_.difference(input, output));
  predicates.push(_.difference(output, input));
  predicates.push(_.intersection(input, Array.isArray(output) ? output : [output]));
  if (input.length <= 6)
    predicates = _.concat(predicates, buildNtoTheMaxPredicates(input, []));
  while (i-- > -1 * input.length) {
    predicates.push(i);
  }
  return predicates;
}

// Trim down the valid predicates to be the shortest.
// i.e. [[1, 2, 3], [3, 2, 1], [3, 1], 1, 3] -> 1
function sortValidPredicates(validPredicates) {
  validPredicates.sort(); // [2, 0, 3] -> [0, 2, 3]
  return _.sortBy(validPredicates, predicate => {
    var weight = 0;
    if (_.isObject(predicate)) {
      if (Array.isArray(predicate)){
        weight += Math.max(predicate.toString().length, 2.5);
      }
      else {
        weight += JSON.stringify(validPredicates).length;
      }
    }
    else {
      weight += predicate.toString().length
    }
    return weight;
  });
}

function matchArray(input, output, predicates) {
  predicates = _.uniqWith(_.concat(predicates, generateArrayPredicates(input, output)), _.isEqual);
  var matches = [];
  _.forEach(functions.funcs.array, func => {
    if (testWithoutPredicate(input, output, func.func)) {
      return matches.push({func: func.name});
    }
    var validPredicates = [];
    _.forEach(predicates, predicate => {
      try {
        var passingPredicates = testWithPredicate(input, output, predicate, func.func);
        if (passingPredicates != 'failure') {
          validPredicates.push(passingPredicates);
        }
      }
      catch(err){}
    });
    if (!_.isEmpty(validPredicates)) {
      matches.push({func: func.name, predicates: _.head(sortValidPredicates(_.uniqWith(validPredicates, _.isEqual)))});
    }
  });
  return matches;
}

function LoMatch(input, output, predicate) {
  if (Array.isArray(input)) {
    return matchArray(input, output, predicate);
  }
  console.log(`Invalid input type or format ${typeof input}`);
}

// console.log(LoMatch(['a', 'b', 'c', 'a', 'b', 'c'], ['b', 'b'], []));
// console.log(LoMatch([1, 2, 3], [[1], [1, 2], [1, 2, 3], [2, 3], [1, 3], [2], [3]], [])) //pullAll
console.log(LoMatch([1, 2, 3, 3, 5, 3], [1, 5], [])); //pullAll with predicate [2, 3]
// console.log(LoMatch([1, 2, [3, 4, [5, [6]]]], [1, 2, 3, 4, 5, 6], []));
// console.log(LoMatch(inputt, outputt, [{ 'user': 'barney', 'active': false }]));
// console.log(LoMatch([1, 2, 3], [1, 2, 3], [], false));
// console.log(LoMatch([{'yep': 1}, {'yep': 2}, {'yep': 3}, {'yep': 4}], 1, []));
// console.log(LoMatch([2, 1, 5], [1], [], false));
// console.log(LoMatch(['a', 'b'], ['a', 'b', 'c', 'd'], [], false));
// console.log(LoMatch([5, 'tacos'], 'tacos', [], false));

module.exports = {
  LoMatch,
}
