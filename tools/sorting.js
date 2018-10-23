const _ = require('lodash');

// Trim down the valid args to be the shortest.
// i.e. [[1, 2, 3], [3, 2, 1], [3, 1], 1, 3] -> 1
function sortValidArgs(validArgs) {
  validArgs.sort(); // [2, 0, 3] -> [0, 2, 3]
  return _.sortBy(validArgs, arg => {
    var weight = 0;
    if (_.isObject(arg)) {
      if (Array.isArray(arg)){
        weight += Math.max(arg.toString().length, 2.5);
      }
      else {
        weight += JSON.stringify(arg).length;
      }
    }
    else {
      weight += arg.toString().length
    }
    return weight;
  });
}

module.exports = {
  sortValidArgs: sortValidArgs,
}
