const _ = require('lodash');

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

module.exports = {
  sortValidPredicates: sortValidPredicates,
}
