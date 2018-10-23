const _ = require('lodash');
const functions = require('./data/functions.js');
const generate = require('./tools/generation.js');
const test = require('./tools/test.js');
const sort = require('./tools/sorting.js')

function match(input, output, args, funcs) {
  var matches = [];
  var outerLoopCount = 0;
  _.forEach(funcs, func => {
    if (test.testWithoutArgs(input, output, func.func)) {
      return matches.push({func: func.name});
    }

    var validArgs = [];
    _.forEach(args, arg => {
      try {
        var passingArgs = test.testWithArg(input, output, arg, func.func);
        if (passingArgs != 'failure') {
          validArgs.push(passingArgs);
        }

        // Multiple argument functions
        if ((func.argCount > 2 || func.argCount === 'infinite') && args.length < 1000) {
          _.forEach(args, secondaryArg => {
            var passingMultipleArguments = test.testWithMultipleArguments(input, output, arg, secondaryArg, func.func);
            if (passingMultipleArguments != 'failure') {
              validArgs.push(passingMultipleArguments);
            }
          });
        }
      }
      catch(err){}
    });

    if (!_.isEmpty(validArgs)) {
      matches.push({func: func.name, args: _.head(sort.sortValidArgs(_.uniqWith(validArgs, _.isEqual)))});
    }

    // Take all the iteratees and return them, let the user decide which iteratee to use in their thing
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
    if (test.testWithoutArgs(input, output, func.func)) {
      return matches.push({func: func.name});
    }
  });
  return matches;
}

function LoMatch(input, output, primers) {
  var funcs;

  primers = Array.isArray(primers) ? primers : [];
  if (Array.isArray(input)) {
    primers = _.concat(primers, generate.generateArrayArgs(input, output));
    funcs = functions.funcs.array;
  }
  else if (_.isString(input)) {
    primers = _.concat(primers, generate.generateStringArgs(input, output));
    funcs = functions.funcs.string;
  }
  else if (_.isObjectLike(input)) {
    primers = _.concat(primers, generate.generateObjectArgs(input, output));
    funcs = functions.funcs.object;
  }
  return _.concat(match(input, output, primers, funcs), matchLang(input, output));
}

module.exports = {
  LoMatch,
}
