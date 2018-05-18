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

    // Take all the iteratee preddies and return them, let the user decide which preddies to use in their thing
    if (func.inputType === 'iteratee') {
      var iteratees = test.testWithIteratees(input, output, func);
      if (!_.isEmpty(iteratees)) {
        matches.push({func: func.name, iteratees: iteratees});
      }
    }
  });
  return matches;
}

function matchLang(input, output) {
  var matches = [];
  _.forEach(functions.funcs.lang, func => {
    if (test.testWithoutPredicate(input, output, func.func)) {
      return matches.push({func: func.name});
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
  else if (_.isObjectLike(input)) {
    predicates = _.concat(predicates, generate.generateObjectPredicates(input, output));
    funcs = functions.funcs.object;
  }
  return _.concat(match(input, output, predicates, funcs), matchLang(input, output));
}

module.exports = {
  LoMatch,
}
