# This script is used to format lodash functions copied from the lodash site in the format that we use in `data/functions.js`
_ = require 'lodash'

arrOfStrings = [
  '_.attempt',
  '_.bindAll',
  '_.cond',
  '_.conforms',
  '_.constant',
  '_.defaultTo',
  '_.flow',
  '_.flowRight',
  '_.identity',
  '_.iteratee',
  '_.matches',
  '_.matchesProperty',
  '_.method',
  '_.methodOf',
  '_.mixin',
  '_.noConflict',
  '_.noop',
  '_.nthArg',
  '_.over',
  '_.overEvery',
  '_.overSome',
  '_.property',
  '_.propertyOf',
  '_.range',
  '_.rangeRight',
  '_.runInContext',
  '_.stubArray',
  '_.stubFalse',
  '_.stubObject',
  '_.stubString',
  '_.stubTrue',
  '_.times',
  '_.toPath',
  '_.uniqueId',
]

go = () ->
  str = ''
  _.forEach arrOfStrings, (func) ->
    str += "{func: #{func}, name: '#{func}'},\n"
  console.log str

go()
