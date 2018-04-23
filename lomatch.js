const _ = require('lodash');
const functions = require('./data/functions.js');
const generate = require('./tools/generation.js');
const test = require('./tools/test.js');
const sort = require('./tools/sorting.js')

function match(input, output, predicates, funcs) {
  var matches = [];
  _.forEach(funcs, func => {
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
  var funcs;
  if (Array.isArray(input)) {
    predicates = _.concat(predicates, generate.generateArrayPredicates(input, output));
    funcs = functions.funcs.array;
  }
  else if (_.isString(input)) {
    predicates = _.concat(predicates, generate.generateStringPredicates(input, output));
    funcs = functions.funcs.string;
  }

  if (!funcs)
    console.log(`Invalid input type or format ${typeof input}`);

  return match(input, output, predicates, funcs);
}

module.exports = {
  LoMatch,
}
