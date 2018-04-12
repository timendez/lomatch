const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Arrays', () => {
  describe('with no predicate or a single predicates', () => {
    describe('_.chunk', () => {
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch(['a', 'b', 'c', 'd'], [['a', 'b'], ['c', 'd']], [], false);
        var expectedMatches = [{func: '_.chunk', predicates: 2}];
        expect(matches).to.eql(expectedMatches);
      });
      it('with a predicate of 3', () => {
        var matches = lomatch.LoMatch(['a', 'b', 'c', 'd'], [['a', 'b', 'c'], ['d']], [], false);
        var expectedMatches = [{func: '_.chunk', predicates: 3}];
        expect(matches).to.eql(expectedMatches);
      });
    });
    describe('_.compact', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch(['a', '', 'b', false, 0, 'c', 'd', 5], ['a', 'b', 'c', 'd', 5], [], false);
        var expectedMatch = {func: '_.compact'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.concat', () => {
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch(['a', 'b'], ['a', 'b', 'c'], [], false);
        var expectedMatch = {func: '_.concat', predicates: 'c'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch(['a', 'b'], ['a', 'b', 'c', 'd'], [], false);
        var expectedMatch = {func: '_.concat', predicates: ['c', 'd']};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.difference', () => {
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [2, 5], [], false);
        var expectedMatch = {func: '_.difference', predicates: [1]};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 2', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [1], [], false);
        var expectedMatch = {func: '_.difference', predicates: [2, 5]};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.drop', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [1, 5], [], false);
        var expectedMatch = {func: '_.drop'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [3], [], false);
        var expectedMatch = {func: '_.drop', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1 and a result of nothing dropped', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1, 2, 3], [], false);
        var expectedMatch = {func: '_.drop', predicates: 0};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.dropRight', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([2, 1, 5], [2, 1], [], false);
        var expectedMatch = {func: '_.dropRight'};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1], [], false);
        var expectedMatch = {func: '_.dropRight', predicates: 2};
        expect(matches).to.deep.include(expectedMatch);
      });
      it('with a predicate of 1 and a result of nothing dropped', () => {
        var matches = lomatch.LoMatch([1, 2, 3], [1, 2, 3], [], false);
        var expectedMatch = {func: '_.dropRight', predicates: 0};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
    describe('_.last', () => {
      it('with no predicate', () => {
        var matches = lomatch.LoMatch([5, 'tacos'], 'tacos', [], false);
        var expectedMatch = {func: '_.last'};
        expect(matches).to.deep.include(expectedMatch);
      });
    });
  });
});
