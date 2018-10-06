const _ = require('lodash');
const functions = require('./data/functions.js');
const generate = require('./tools/generation.js');
const test = require('./tools/test.js');
const sort = require('./tools/sorting.js')

function match(input, output, predicates, funcs) {
  var matches = [];
  var outerLoopCount = 0;
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

        // Multiple argument functions
        if ((func.argCount > 2 || func.argCount === 'infinite') && predicates.length < 1000) {
          _.forEach(predicates, secondaryPredicate => {
            var passingMultipleArguments = test.testWithMultipleArguments(input, output, predicate, secondaryPredicate, func.func);
            if (passingMultipleArguments != 'failure') {
              validPredicates.push(passingMultipleArguments);
            }
          });
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

// console.log(LoMatch([{foo: 1, bar: 2}, {foo: 3, bar: 4}], { foo: 4, bar: 6 }, [_.add]));
// console.log('result = \n' + JSON.stringify(LoMatch(['a', 'b', 'c', 'd'], [['a', 'b'], ['c', 'd']], [])));

module.exports = {
  LoMatch,
}
