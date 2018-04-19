[![CircleCI](https://circleci.com/gh/timendez/lomatch.svg?style=svg&circle-token=49d1bbdea2df1010cd039af572a82adb2f003645)](https://circleci.com/gh/timendez/lomatch)
# lomatch
Lomatch is a tool that figures out what LoDash function you should use given an input, desired output, and predicate.

## Arrays
### Example
I have a starting array of `[1, 2, 3, 2, 2]`, and I want a final array of `[1, 3]`. I don't know which lodash functions I need to use in order to get there, so I'll use lomatch!

```javascript
lomatch.LoMatch([1, 2, 3, 2, 2], [1, 3], []);
```
This will return an output of all the lodash functions and predicate combinations you should use (only one '[smallest](tools/sorting.js#L5)' predicate per function).
```javascript
[ { func: '_.difference', predicates: [ 2 ] },
  { func: '_.differenceBy', predicates: [ 2 ] },
  { func: '_.differenceWith', predicates: [ 2 ] },
  { func: '_.intersection', predicates: [ 1, 3 ] },
  { func: '_.intersectionBy', predicates: [ 1, 3 ] },
  { func: '_.intersectionWith', predicates: [ 1, 3 ] },
  { func: '_.pull', predicates: 2 },
  { func: '_.pullAll', predicates: [ 2 ] },
  { func: '_.pullAllBy', predicates: [ 2 ] },
  { func: '_.pullAllWith', predicates: [ 2 ] },
  { func: '_.pullAt', predicates: [ 0, 2 ] },
  { func: '_.without', predicates: 2 },
  { func: '_.xor', predicates: [ 2 ] },
  { func: '_.xorBy', predicates: [ 2 ] },
  { func: '_.xorWith', predicates: [ 2 ] } ]
```
This means that you can use something like `_.pull([1, 2, 3, 2, 2], 2)` in order to get `[1, 3]`. Lomatch will return results for both modified arrays and returned arrays. Be sure to read the [lodash documentation](https://lodash.com/docs/4.17.5) for the function you are going to use.
