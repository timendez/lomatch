const _ = require('lodash');

functions = {
  array: [
    {func: _.chunk, name: '_.chunk'},
    {func: _.compact, name: '_.compact'},
    {func: _.concat, name: '_.concat'},
    {func: _.difference, name: '_.difference'},
    {func: _.differenceBy, name: '_.differenceBy'},
    {func: _.differenceWith, name: '_.differenceWith'},
    {func: _.drop, name: '_.drop'},
    {func: _.dropRight, name: '_.dropRight'},
    {func: _.dropRightWhile, name: '_.dropRightWhile'},
    {func: _.dropWhile, name: '_.dropWhile'},
    {func: _.fill, name: '_.fill', mutates: true},
    {func: _.findIndex, name: '_.findIndex'},
    {func: _.findLastIndex, name: '_.findLastIndex'},
    {func: _.flatten, name: '_.flatten'},
    {func: _.flattenDeep, name: '_.flattenDeep'},
    {func: _.flattenDepth, name: '_.flattenDepth'},
    {func: _.fromPairs, name: '_.fromPairs'},
    {func: _.head, name: '_.head'},
    {func: _.indexOf, name: '_.indexOf'},
    {func: _.initial, name: '_.initial'},
    {func: _.intersection, name: '_.intersection'}, //TODO Support a single array parameter of multiple values
    {func: _.intersectionBy, name: '_.intersectionBy'}, //TODO
    {func: _.intersectionWith, name: '_.intersectionWith'}, //TODO
    {func: _.join, name: '_.join'},
    {func: _.last, name: '_.last'},
    {func: _.lastIndexOf, name: '_.lastIndexOf'},
    {func: _.nth, name: '_.nth'},
    {func: _.pull, name: '_.pull', mutates: true},
    {func: _.pullAll, name: '_.pullAll', mutates: true},
    {func: _.pullAllBy, name: '_.pullAllBy', mutates: true}, //TODO Support iteratee functions
    {func: _.pullAllWith, name: '_.pullAllWith', mutates: true}, //TODO Support comparator functions
    {func: _.pullAt, name: '_.pullAt', mutates: true},
    {func: _.remove, name: '_.remove', mutates: true}, //TODO Support function predicates
    {func: _.reverse, name: '_.reverse', mutates: true},
    {func: _.slice, name: '_.slice'}, // TODO Support multiple argument functions
    {func: _.sortedIndex, name: '_.sortedIndex'},
    {func: _.sortedIndexBy, name: '_.sortedIndexBy'}, //TODO Support multiple argument functions, function predicates
    {func: _.sortedIndexOf, name: '_.sortedIndexOf'},
    {func: _.sortedLastIndex, name: '_.sortedLastIndex'},
    {func: _.sortedLastIndexBy, name: '_.sortedLastIndexBy'}, //TODO Support multiple argument functions, function predicates
    {func: _.sortedLastIndexOf, name: '_.sortedLastIndexOf'},
    {func: _.sortedUniq, name: '_.sortedUniq'},
    {func: _.sortedUniqBy, name: '_.sortedUniqBy'}, //TODO Suport iteratee functions
    {func: _.tail, name: '_.tail'},
    {func: _.take, name: '_.take'},
    {func: _.takeRight, name: '_.takeRight'},
    {func: _.takeRightWhile, name: '_.takeRightWhile'}, //TODO Support identity functions
    {func: _.takeWhile, name: '_.takeWhile'}, //TODO Support identity functions
    {func: _.union, name: '_.union'}, //TODO Support a single array parameter of multiple values
    {func: _.unionBy, name: '_.unionBy'}, //TODO
    {func: _.unionWith, name: '_.unionWith'}, //TODO
    {func: _.uniq, name: '_.uniq'},
    {func: _.uniqBy, name: '_.uniqBy'},
    {func: _.uniqWith, name: '_.uniqWith'}, //TODO Support comparators
    {func: _.unzip, name: '_.unzip'},
    {func: _.unzipWith, name: '_.unzipWith'}, //TODO Support identity arguments
    {func: _.without, name: '_.without'}, //TODO Support multiple arguments
    {func: _.xor, name: '_.xor'},
    {func: _.xorBy, name: '_.xorBy'}, //TODO Support multiple arrays and a comparator
    {func: _.xorWith, name: '_.xorWith'}, //TODO
    {func: _.zip, name: '_.zip'}, //TODO Support multiple arrays
    {func: _.zipObject, name: '_.zipObject'}, //TODO Support complex predicate generation
    {func: _.zipObjectDeep, name: '_.zipObjectDeep'}, //TODO
    {func: _.zipWith, name: '_.zipWith'}, //TODO Support multiple arguments, identity iteratees
  ],
  collection: [
    {func: _.countBy, name: '_.countBy'},
    {func: _.every, name: '_.every'},
    {func: _.filter, name: '_.filter'},
    {func: _.find, name: '_.find'},
    {func: _.findLast, name: '_.findLast'},
    {func: _.flatMap, name: '_.flatMap'},
    {func: _.flatMapDeep, name: '_.flatMapDeep'},
    {func: _.flatMapDepth, name: '_.flatMapDepth'},
    {func: _.forEach, name: '_.forEach'},
    {func: _.forEachRight, name: '_.forEachRight'},
    {func: _.groupBy, name: '_.groupBy'},
    {func: _.includes, name: '_.includes'},
    {func: _.invokeMap, name: '_.invokeMap'},
    {func: _.keyBy, name: '_.keyBy'},
    {func: _.map, name: '_.map'},
    {func: _.orderBy, name: '_.orderBy'},
    {func: _.partition, name: '_.partition'},
    {func: _.reduce, name: '_.reduce'},
    {func: _.reduceRight, name: '_.reduceRight'},
    {func: _.reject, name: '_.reject'},
    {func: _.sample, name: '_.sample'},
    {func: _.sampleSize, name: '_.sampleSize'},
    {func: _.shuffle, name: '_.shuffle'},
    {func: _.size, name: '_.size'},
    {func: _.some, name: '_.some'},
    {func: _.sortBy, name: '_.sortBy'},
  ],
  date: [
    {func: _.now, name: '_.now'},
  ],
  function: [
    {func: _.after, name: '_.after'},
    {func: _.ary, name: '_.ary'},
    {func: _.before, name: '_.before'},
    {func: _.bind, name: '_.bind'},
    {func: _.bindKey, name: '_.bindKey'},
    {func: _.curry, name: '_.curry'},
    {func: _.curryRight, name: '_.curryRight'},
    {func: _.debounce, name: '_.debounce'},
    {func: _.defer, name: '_.defer'},
    {func: _.delay, name: '_.delay'},
    {func: _.flip, name: '_.flip'},
    {func: _.memoize, name: '_.memoize'},
    {func: _.negate, name: '_.negate'},
    {func: _.once, name: '_.once'},
    {func: _.overArgs, name: '_.overArgs'},
    {func: _.partial, name: '_.partial'},
    {func: _.partialRight, name: '_.partialRight'},
    {func: _.rearg, name: '_.rearg'},
    {func: _.rest, name: '_.rest'},
    {func: _.spread, name: '_.spread'},
    {func: _.throttle, name: '_.throttle'},
    {func: _.unary, name: '_.unary'},
    {func: _.wrap, name: '_.wrap'},
  ],
  lang: [
    {func: _.castArray, name: '_.castArray'},
    {func: _.clone, name: '_.clone'},
    {func: _.cloneDeep, name: '_.cloneDeep'},
    {func: _.cloneDeepWith, name: '_.cloneDeepWith'},
    {func: _.cloneWith, name: '_.cloneWith'},
    {func: _.conformsTo, name: '_.conformsTo'},
    {func: _.eq, name: '_.eq'},
    {func: _.gt, name: '_.gt'},
    {func: _.gte, name: '_.gte'},
    {func: _.isArguments, name: '_.isArguments'},
    {func: _.isArray, name: '_.isArray'},
    {func: _.isArrayBuffer, name: '_.isArrayBuffer'},
    {func: _.isArrayLike, name: '_.isArrayLike'},
    {func: _.isArrayLikeObject, name: '_.isArrayLikeObject'},
    {func: _.isBoolean, name: '_.isBoolean'},
    {func: _.isBuffer, name: '_.isBuffer'},
    {func: _.isDate, name: '_.isDate'},
    {func: _.isElement, name: '_.isElement'},
    {func: _.isEmpty, name: '_.isEmpty'},
    {func: _.isEqual, name: '_.isEqual'},
    {func: _.isEqualWith, name: '_.isEqualWith'},
    {func: _.isError, name: '_.isError'},
    {func: _.isFinite, name: '_.isFinite'},
    {func: _.isFunction, name: '_.isFunction'},
    {func: _.isInteger, name: '_.isInteger'},
    {func: _.isLength, name: '_.isLength'},
    {func: _.isMap, name: '_.isMap'},
    {func: _.isMatch, name: '_.isMatch'},
    {func: _.isMatchWith, name: '_.isMatchWith'},
    {func: _.isNaN, name: '_.isNaN'},
    {func: _.isNative, name: '_.isNative'},
    {func: _.isNil, name: '_.isNil'},
    {func: _.isNull, name: '_.isNull'},
    {func: _.isNumber, name: '_.isNumber'},
    {func: _.isObject, name: '_.isObject'},
    {func: _.isObjectLike, name: '_.isObjectLike'},
    {func: _.isPlainObject, name: '_.isPlainObject'},
    {func: _.isRegExp, name: '_.isRegExp'},
    {func: _.isSafeInteger, name: '_.isSafeInteger'},
    {func: _.isSet, name: '_.isSet'},
    {func: _.isString, name: '_.isString'},
    {func: _.isSymbol, name: '_.isSymbol'},
    {func: _.isTypedArray, name: '_.isTypedArray'},
    {func: _.isUndefined, name: '_.isUndefined'},
    {func: _.isWeakMap, name: '_.isWeakMap'},
    {func: _.isWeakSet, name: '_.isWeakSet'},
    {func: _.lt, name: '_.lt'},
    {func: _.lte, name: '_.lte'},
    {func: _.toArray, name: '_.toArray'},
    {func: _.toFinite, name: '_.toFinite'},
    {func: _.toInteger, name: '_.toInteger'},
    {func: _.toLength, name: '_.toLength'},
    {func: _.toNumber, name: '_.toNumber'},
    {func: _.toPlainObject, name: '_.toPlainObject'},
    {func: _.toSafeInteger, name: '_.toSafeInteger'},
    {func: _.toString, name: '_.toString'},
  ],
  match: [
    {func: _.add, name: '_.add'},
    {func: _.ceil, name: '_.ceil'},
    {func: _.divide, name: '_.divide'},
    {func: _.floor, name: '_.floor'},
    {func: _.max, name: '_.max'},
    {func: _.maxBy, name: '_.maxBy'},
    {func: _.mean, name: '_.mean'},
    {func: _.meanBy, name: '_.meanBy'},
    {func: _.min, name: '_.min'},
    {func: _.minBy, name: '_.minBy'},
    {func: _.multiply, name: '_.multiply'},
    {func: _.round, name: '_.round'},
    {func: _.subtract, name: '_.subtract'},
    {func: _.sum, name: '_.sum'},
    {func: _.sumBy, name: '_.sumBy'},
  ],
  number: [
    {func: _.clamp, name: '_.clamp'},
    {func: _.inRange, name: '_.inRange'},
    {func: _.random, name: '_.random'},
  ],
  object: [
    {func: _.assign, name: '_.assign'},
    {func: _.assignIn, name: '_.assignIn'},
    {func: _.assignInWith, name: '_.assignInWith'},
    {func: _.assignWith, name: '_.assignWith'},
    {func: _.at, name: '_.at'},
    {func: _.create, name: '_.create'},
    {func: _.defaults, name: '_.defaults'},
    {func: _.defaultsDeep, name: '_.defaultsDeep'},
    {func: _.findKey, name: '_.findKey'},
    {func: _.findLastKey, name: '_.findLastKey'},
    {func: _.forIn, name: '_.forIn'},
    {func: _.forInRight, name: '_.forInRight'},
    {func: _.forOwn, name: '_.forOwn'},
    {func: _.forOwnRight, name: '_.forOwnRight'},
    {func: _.functions, name: '_.functions'},
    {func: _.functionsIn, name: '_.functionsIn'},
    {func: _.get, name: '_.get'},
    {func: _.has, name: '_.has'},
    {func: _.hasIn, name: '_.hasIn'},
    {func: _.invert, name: '_.invert'},
    {func: _.invertBy, name: '_.invertBy'},
    {func: _.invoke, name: '_.invoke'},
    {func: _.keys, name: '_.keys'},
    {func: _.keysIn, name: '_.keysIn'},
    {func: _.mapKeys, name: '_.mapKeys'},
    {func: _.mapValues, name: '_.mapValues'},
    {func: _.merge, name: '_.merge'},
    {func: _.mergeWith, name: '_.mergeWith'},
    {func: _.omit, name: '_.omit'},
    {func: _.omitBy, name: '_.omitBy'},
    {func: _.pick, name: '_.pick'},
    {func: _.pickBy, name: '_.pickBy'},
    {func: _.result, name: '_.result'},
    {func: _.set, name: '_.set'},
    {func: _.setWith, name: '_.setWith'},
    {func: _.toPairs, name: '_.toPairs'},
    {func: _.toPairsIn, name: '_.toPairsIn'},
    {func: _.transform, name: '_.transform'},
    {func: _.unset, name: '_.unset'},
    {func: _.update, name: '_.update'},
    {func: _.updateWith, name: '_.updateWith'},
    {func: _.values, name: '_.values'},
    {func: _.valuesIn, name: '_.valuesIn'},
  ],
  string: [
    {func: _.camelCase, name: '_.camelCase'},
    {func: _.capitalize, name: '_.capitalize'},
    {func: _.deburr, name: '_.deburr'},
    {func: _.endsWith, name: '_.endsWith'},
    {func: _.escape, name: '_.escape'},
    {func: _.escapeRegExp, name: '_.escapeRegExp'},
    {func: _.kebabCase, name: '_.kebabCase'},
    {func: _.lowerCase, name: '_.lowerCase'},
    {func: _.lowerFirst, name: '_.lowerFirst'},
    {func: _.pad, name: '_.pad'},
    {func: _.padEnd, name: '_.padEnd'},
    {func: _.padStart, name: '_.padStart'},
    {func: _.parseInt, name: '_.parseInt'},
    {func: _.repeat, name: '_.repeat'},
    {func: _.replace, name: '_.replace'}, //TODO multiple arguments
    {func: _.snakeCase, name: '_.snakeCase'},
    {func: _.split, name: '_.split'}, //TODO multiple arguments
    {func: _.startCase, name: '_.startCase'},
    {func: _.startsWith, name: '_.startsWith'},
    {func: _.template, name: '_.template'}, //TODO good luck
    {func: _.toLower, name: '_.toLower'},
    {func: _.toUpper, name: '_.toUpper'},
    {func: _.trim, name: '_.trim'}, //TODO multiple arguments
    {func: _.trimEnd, name: '_.trimEnd'},
    {func: _.trimStart, name: '_.trimStart'},
    {func: _.truncate, name: '_.truncate'}, //TODO complex object predicate
    {func: _.unescape, name: '_.unescape'},
    {func: _.upperCase, name: '_.upperCase'},
    {func: _.upperFirst, name: '_.upperFirst'},
    {func: _.words, name: '_.words'}, //TODO regex predicate generation
  ],
  util: [
    {func: _.attempt, name: '_.attempt'},
    {func: _.bindAll, name: '_.bindAll'},
    {func: _.cond, name: '_.cond'},
    {func: _.conforms, name: '_.conforms'},
    {func: _.constant, name: '_.constant'},
    {func: _.defaultTo, name: '_.defaultTo'},
    {func: _.flow, name: '_.flow'},
    {func: _.flowRight, name: '_.flowRight'},
    {func: _.identity, name: '_.identity'},
    {func: _.iteratee, name: '_.iteratee'},
    {func: _.matches, name: '_.matches'},
    {func: _.matchesProperty, name: '_.matchesProperty'},
    {func: _.method, name: '_.method'},
    {func: _.methodOf, name: '_.methodOf'},
    {func: _.mixin, name: '_.mixin'},
    {func: _.noConflict, name: '_.noConflict'},
    {func: _.noop, name: '_.noop'},
    {func: _.nthArg, name: '_.nthArg'},
    {func: _.over, name: '_.over'},
    {func: _.overEvery, name: '_.overEvery'},
    {func: _.overSome, name: '_.overSome'},
    {func: _.property, name: '_.property'},
    {func: _.propertyOf, name: '_.propertyOf'},
    {func: _.range, name: '_.range'},
    {func: _.rangeRight, name: '_.rangeRight'},
    {func: _.runInContext, name: '_.runInContext'},
    {func: _.stubArray, name: '_.stubArray'},
    {func: _.stubFalse, name: '_.stubFalse'},
    {func: _.stubObject, name: '_.stubObject'},
    {func: _.stubString, name: '_.stubString'},
    {func: _.stubTrue, name: '_.stubTrue'},
    {func: _.times, name: '_.times'},
    {func: _.toPath, name: '_.toPath'},
    {func: _.uniqueId, name: '_.uniqueId'},
  ],
}

var guardedMethods = [
  _.ary,
  _.chunk,
  _.curry,
  _.curryRight,
  _.drop,
  _.dropRight,
  _.every,
  _.fill,
  _.invert,
  _.parseInt,
  _.random,
  _.range,
  _.rangeRight,
  _.repeat,
  _.sampleSize,
  _.slice,
  _.some,
  _.sortBy,
  _.split,
  _.take,
  _.takeRight,
  _.template,
  _.trim,
  _.trimEnd,
  _.trimStart,
  _.words,
]

module.exports = {
  funcs: functions,
  guardedMethods: guardedMethods
}
