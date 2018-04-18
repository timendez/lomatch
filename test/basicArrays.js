const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Arrays', () => {
  describe('passing in a full valid predicate with the input and output', () => {
    describe('_.dropWhile', () => {
      it('passing in a function predicate', () => {
        var input = [
          { 'user': 'barney',  'active': false },
          { 'user': 'fred',    'active': false },
          { 'user': 'pebbles', 'active': true }
        ];
        var output = [
          { 'user': 'fred',    'active': false },
          { 'user': 'pebbles', 'active': true }
        ];
        var matches = lomatch.LoMatch(input, output, [{ 'user': 'barney', 'active': false }]);
        var expectedMatch = {func: '_.dropWhile', predicates: { 'user': 'barney', 'active': false }};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.join', () => {
      it('with a simple array', () => {
        var matches = lomatch.LoMatch([1, 2, 3], '1, 2, 3', [', ']);
        var expectedMatch = {func: '_.join', predicates: ', '};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
  });

  describe('with no predicate or a single predicates', () => {
    describe('_.chunk', () => {
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch(['a', 'b', 'c', 'd'], [['a', 'b'], ['c', 'd']], []);
        var expectedMatches = [{func: '_.chunk', predicates: 2}];
        expect(matches).to.eql(expectedMatches);
      });
      it('with a predicate of 3', () => {
        var matches = lomatch.LoMatch(['a', 'b', 'c', 'd'], [['a', 'b', 'c'], ['d']], []);
        var expectedMatches = [{func: '_.chunk', predicates: 3}];
        expect(matches).to.eql(expectedMatches);
      });
    });
    describe('_.compact', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch(['a', '', 'b', false, 0, 'c', 'd', 5], ['a', 'b', 'c', 'd', 5], []);
        var expectedMatch = {func: '_.compact'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.concat', () => {
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch(['a', 'b'], ['a', 'b', 'c'], []);
        var expectedMatch = {func: '_.concat', predicates: 'c'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch(['a', 'b'], ['a', 'b', 'c', 'd'], []);
        var expectedMatch = {func: '_.concat', predicates: ['c', 'd']};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.difference', () => {
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [2, 5], []);
        var expectedMatch = {func: '_.difference', predicates: [1]};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [1], []);
        var expectedMatch = {func: '_.difference', predicates: [2, 5]};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.drop', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [1, 5], []);
        var expectedMatch = {func: '_.drop'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [3], []);
        var expectedMatch = {func: '_.drop', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1 and a result of nothing dropped', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1, 2, 3], []);
        var expectedMatch = {func: '_.drop', predicates: 0};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.dropRight', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [2, 1], []);
        var expectedMatch = {func: '_.dropRight'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1], []);
        var expectedMatch = {func: '_.dropRight', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1 and a result of nothing dropped', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1, 2, 3], []);
        var expectedMatch = {func: '_.dropRight', predicates: 0};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.fill', () => {
      it('with a single value', () => {
        var matches = lomatch.LoMatch([1, 2], [1, 1], []);
        var expectedMatch = {func: '_.fill', predicates: 1};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.findIndex', () => {
      it('with one match', () => {
        var matches = lomatch.LoMatch([{'yep': 1}, {'yep': 2}, {'yep': 3}, {'yep': 4}], 1, []);
        var expectedMatch = {func: '_.findIndex', predicates: {'yep': 2}};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.findLastIndex', () => {
      it('with one match', () => {
        var matches = lomatch.LoMatch([{'yep': 1}, {'yep': 2}, {'yep': 2}, {'yep': 4}], 2, []);
        var expectedMatch = {func: '_.findLastIndex', predicates: {'yep': 2}};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.flatten', () => {
      it('with a deep array', () => {
        var matches = lomatch.LoMatch([1, 2, [3, 4, [5, [6]]]], [1, 2, 3, 4, [5, [6]]], []);
        var expectedMatch = {func: '_.flatten'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.flattenDeep', () => {
      it('with a deep array', () => {
        var matches = lomatch.LoMatch([1, 2, [3, 4, [5, [6]]]], [1, 2, 3, 4, 5, 6], []);
        var expectedMatch = {func: '_.flattenDeep'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.flattenDepth', () => {
      it('with a depth of 2', () => {
        var matches = lomatch.LoMatch([1, 2, [3, 4, [5, [6]]]], [1, 2, 3, 4, 5, [6]], []);
        var expectedMatch = {func: '_.flattenDepth', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.fromPairs', () => {
      it('with 2 pairs', () => {
        var matches = lomatch.LoMatch([['a', 1], ['b', 2]], {'a': 1, 'b': 2}, []);
        var expectedMatch = {func: '_.fromPairs'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.head', () => {
      it('with a small array', () => {
        var matches = lomatch.LoMatch([1, 2, 3], 1, []);
        var expectedMatch = {func: '_.head'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.indexOf', () => {
      it('with a single level array', () => {
        var matches = lomatch.LoMatch([1, 2, 3], 1, []);
        var expectedMatch = {func: '_.indexOf', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.initial', () => {
      it('with a simple array', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1, 2], []);
        var expectedMatch = {func: '_.initial'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.last', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([5, 'tacos'], 'tacos', []);
        var expectedMatch = {func: '_.last'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.lastIndexOf', () => {
      it('with a predicate and no fromIndex', () => {
        var matches = lomatch.LoMatch([1, 2, 3, 4, 3, 4], 4, []);
        var expectedMatch = {func: '_.lastIndexOf', predicates: 3};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.nth', () => {
      it('with a simple array', () => {
        var matches = lomatch.LoMatch([1, 2, 3], 2, []);
        var expectedMatch = {func: '_.nth', predicates: 1};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.pull', () => {
      it('with a single value to remove', () => {
        var matches = lomatch.LoMatch([1, 2, 3, 2, 2], [1, 3], []);
        var expectedMatch = {func: '_.pull', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.pullAll', () => {
      it('with an array under 7 elements', () => {
        var matches = lomatch.LoMatch([1, 2, 3, 3, 5, 3], [1, 5], []);
        var expectedMatch = {func: '_.pullAll', predicates: [2, 3]};
        expect(matches).to.deep.include(expectedMatch);
      });
      it("it can't handle an array of 7 elements or greater", () => {
        var matches = lomatch.LoMatch([1, 2, 3, 3, 5, 3, 3], [1, 5], []);
        var expectedMatch = {func: '_.pullAll', predicates: [2, 3]};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.pullAt', () => {
      it('with an array under 7 elements', () => {
        var matches = lomatch.LoMatch(['a', 'b', 'c', 'd'], ['a', 'c'], []);
        console.log(matches);
        var expectedMatch = {func: '_.pullAt', predicates: [0, 2]};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
  });
});
