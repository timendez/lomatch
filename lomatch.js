const _ = require('lodash');
const functions = require('./data/functions.js');
const generate = require('./tools/generation.js');
const test = require('./tools/test.js');
const sort = require('./tools/sorting.js')

function matchArray(input, output, predicates) {
  predicates = _.uniqWith(_.concat(predicates, generate.generateArrayPredicates(input, output)), _.isEqual);
  var matches = [];
  _.forEach(functions.funcs.array, func => {
    if (test.testWithoutPredicate(input, output, func.func)) {
      return matches.push({func: func.name});
    }
    var validPredicates = [];
    _.forEach(predicates, predicate => {
      try {
        var passingPredicates = test.testWithPredicate(input, output, predicate, func.func);
        if (passingPredicates != 'failure') {
          validPredicates.push(passingPredicates);
        }
      }
      catch(err){}
    });
    if (!_.isEmpty(validPredicates)) {
      matches.push({func: func.name, predicates: _.head(sort.sortValidPredicates(_.uniqWith(validPredicates, _.isEqual)))});
    }
  });
  return matches;
}

function LoMatch(input, output, predicates) {
  if (Array.isArray(input)) {
    return matchArray(input, output, predicates);
  }
  console.log(`Invalid input type or format ${typeof input}`);
}

module.exports = {
  LoMatch,
}
