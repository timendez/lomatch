[![CircleCI](https://circleci.com/gh/timendez/lomatch.svg?style=svg&circle-token=49d1bbdea2df1010cd039af572a82adb2f003645)](https://circleci.com/gh/timendez/lomatch)

![LoMatch](./logo.png)

# LoMatch
LoMatch is a tool that figures out what Lodash function you should use given an input, desired output, and predicate.

## Online Tool
LoMatch isn't likely to live inside of a project, but more likely to be used a few times throughout a project in order to determine what Lodash functions to use. Because of this, I created an online tool to use LoMatch. **You will almost always only need to use this tool and not need to install the npm module.**

https://www.lomatch.online - please give it some time to load, hosted on the Heroku free tier.

https://lomatch.herokuapp.com as a backup because the domain is expiring late October, 2020 and namecheap wants 35 dang dollarydoos for renewal.

## Installation
LoMatch is available as an npm module if you so choose to include it in your project. This is the easiest way to install it:
### npm
```
npm install lomatch
```

### yarn
```
yarn add lomatch
```

## Usage
```javascript
const { LoMatch } = require('lomatch');
let results = LoMatch(input, output, primers);
console.log(results);
```
**input** - an object, array, or string that you currently have
**output** - the desired format you want your data in
**primers** - an array of values that you think will help LoMatch figure out a result
**results** - an array of objects containing a `func` and `args` that when in combination with your input can get you to your output

Examples below

## Arrays
### Example
I have a starting array of `[1, 2, 3, 2, 2]`, and I want a final array of `[1, 3]`. I don't know which Lodash functions I need to use in order to get there, so I'll use LoMatch!

```javascript
const { LoMatch } = require('lomatch');
LoMatch([1, 2, 3, 2, 2], [1, 3], []);
```
This will return an output of all the Lodash functions and predicate combinations you should use (only one '[smallest](tools/sorting.js#L5)' predicate per function).
```javascript
[ { func: '_.difference', args: [ 2 ] },
  { func: '_.differenceBy', args: [ 2 ] },
  { func: '_.differenceWith', args: [ 2 ] },
  { func: '_.intersection', args: [ 1, 3 ] },
  { func: '_.intersectionBy', args: [ 1, 3 ] },
  { func: '_.intersectionWith', args: [ 1, 3 ] },
  { func: '_.pull', args: 2 },
  { func: '_.pullAll', args: [ 2 ] },
  { func: '_.pullAllBy', args: [ 2 ] },
  { func: '_.pullAllWith', args: [ 2 ] },
  { func: '_.pullAt', args: [ 0, 2 ] },
  { func: '_.without', args: 2 },
  { func: '_.xor', args: [ 2 ] },
  { func: '_.xorBy', args: [ 2 ] },
  { func: '_.xorWith', args: [ 2 ] } ]
```
This means that you can use something like `_.pull([1, 2, 3, 2, 2], 2)` in order to get `[1, 3]`. LoMatch will return results for both modified arrays and returned arrays. Be sure to read the [Lodash documentation](https://lodash.com/docs/4.17.10) for the function you are going to use.

## Objects
### Example
I have a starting object of `{ 'a': [{ 'b': { 'c': 3 } }, 4] }`, and I want a final array of `[3, 4]`.

```javascript
const { LoMatch } = require('lomatch');
LoMatch({ 'a': [{ 'b': { 'c': 3 } }, 4] }, [3, 4], []);
```
This will return an output of all the Lodash functions and predicate combinations you should use.
```javascript
[ { func: '_.at', args: [ 'a[0].b.c', 'a[1]' ] } ]
```
This means that you can use `_.at({ 'a': [{ 'b': { 'c': 3 } }, 4] }, [ 'a[0].b.c', 'a[1]' ])` in order to get `[3, 4]`. LoMatch will return results for both modified objects and returned objects. Be sure to read the [Lodash documentation](https://lodash.com/docs/4.17.5) for the function you are going to use.

## Strings
While strings are supported by LoMatch, there will only in rare cases be more than one solution.
### Example
I have a starting string of `'fred, barney, & pebbles'`, and I want a final array of `['fred', 'barney', 'pebbles']`.

```javascript
const { LoMatch } = require('lomatch');
LoMatch('fred, barney, & pebbles', ['fred', 'barney', 'pebbles'], []);
```
This will return an output of all the Lodash functions and predicate combinations you should use.
```javascript
[ { func: '_.words', args: [] } ]
```
This means that you can use `_.words('fred, barney, & pebbles')` in order to get `['fred', 'barney', 'pebbles']`. Keep in mind strings are primitives and thus cannot be mutated in JavaScript. Be sure to read the [Lodash documentation](https://lodash.com/docs/4.17.5) for the function you are going to use.
