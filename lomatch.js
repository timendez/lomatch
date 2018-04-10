const _ = require('lodash');
const functions = require('./functions.js');

function test(input, output, predicate, func) {
  testInput = _.clone(input);
  switch (func.length) {
    case 0: // Splat
      if (_.isEqual(output, func(testInput)))
        return true;
      else if (_.isEqual(output, func(testInput, predicate)))
        return true;
      else if (_.isEqual(output, func(testInput, predicate, 0)))
        return true
      break;
    case 1:
      return _.isEqual(output, func(testInput))
    case 2:
      return _.isEqual(output, func(testInput, predicate)) || _.isEqual(output, func(testInput));
    case 3:
      return _.isEqual(output, func(testInput, predicate, 0)) || _.isEqual(output, func(testInput, predicate));
    case 4:
      return _.isEqual(output, func(testInput, predicate, 0, 0)) || _.isEqual(output, func(testInput, predicate, 0)) || _.isEqual(output, func(testInput, predicate));
    default:
      console.log(`function ${func.name} has too many args: ${func.length}`);
  }
  return false;
}

function generateArrayPredicates(input, output) {
  var i = input.length;
  predicates = _.concat([output], output);
  while (i--) {
    predicates.push(i);
  }
  return predicates;
}

function matchArray(input, output, predicates, allMatches) {
  predicates = _.uniq(_.concat(predicates, generateArrayPredicates(input, output)));
  var matches = [];
  _.forEach(functions.funcs.array, func => {
    _.forEach(predicates, predicate => {
      if (test(input, output, predicate, func.func)) {
        matches.push({func: func, predicate: predicate});
      }
    })
  })
  return matches;
}

function match(input, output, predicate, allMatches) {
  if (Array.isArray(input)) {
    return console.log(matchArray(input, output, predicate, allMatches));
  }
  console.log(`Invalid input type or format ${typeof input}`);
}

match([{fred: 'yep'}, {barney: 'nope'}], {barney: 'nope'}, [], false);
