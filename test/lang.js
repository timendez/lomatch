const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Lang', () => {
  describe('_.castArray', () => {
    it('with an integer', () => {
      var matches = lomatch.LoMatch(1, [1], []);
      var expectedMatch = {func: '_.castArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with an object', () => {
      var matches = lomatch.LoMatch({'a': 1}, [{'a': 1}], []);
      var expectedMatch = {func: '_.castArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a string', () => {
      var matches = lomatch.LoMatch('abc', ['abc'], []);
      var expectedMatch = {func: '_.castArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with null', () => {
      var matches = lomatch.LoMatch(null, [null], []);
      var expectedMatch = {func: '_.castArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with undefined', () => {
      var matches = lomatch.LoMatch(undefined, [undefined], []);
      var expectedMatch = {func: '_.castArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.clone', () => {
    it('with an array of objects', () => {
      var input = [{'a': 1}, {'b': 2}];
      var matches = lomatch.LoMatch(input, _.clone(input), []);
      var expectedMatch = {func: '_.clone'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.cloneDeep', () => {
    it('with an array of objects', () => {
      var input = [{'a': 1}, {'b': 2}];
      var matches = lomatch.LoMatch(input, _.cloneDeep(input), []);
      var expectedMatch = {func: '_.cloneDeep'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toArray', () => {
    it('with an object', () => {
      var matches = lomatch.LoMatch({'a': 1, 'b': 2}, [1, 2], []);
      var expectedMatch = {func: '_.toArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a string', () => {
      var matches = lomatch.LoMatch('abc', ['a', 'b', 'c'], []);
      var expectedMatch = {func: '_.toArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with an integer', () => {
      var matches = lomatch.LoMatch(1, [], []);
      var expectedMatch = {func: '_.toArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with null', () => {
      var matches = lomatch.LoMatch(null, [], []);
      var expectedMatch = {func: '_.toArray'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toFinite', () => {
    it('with a string', () => {
      var matches = lomatch.LoMatch('3.2', 3.2, []);
      var expectedMatch = {func: '_.toFinite'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with infinity', () => {
      var matches = lomatch.LoMatch(Infinity, 1.7976931348623157e+308, []);
      var expectedMatch = {func: '_.toFinite'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toInteger', () => {
    it('with a string', () => {
      var matches = lomatch.LoMatch('3.2', 3, []);
      var expectedMatch = {func: '_.toInteger'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a decimal number', () => {
      var matches = lomatch.LoMatch(3.2, 3, []);
      var expectedMatch = {func: '_.toInteger'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toLength', () => {
    it('with a string', () => {
      var matches = lomatch.LoMatch('3.2', 3, []);
      var expectedMatch = {func: '_.toLength'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with infinity', () => {
      var matches = lomatch.LoMatch(Infinity, 4294967295, []);
      var expectedMatch = {func: '_.toLength'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toNumber', () => {
    it('with a string', () => {
      var matches = lomatch.LoMatch('3.2', 3.2, []);
      var expectedMatch = {func: '_.toNumber'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with infinity', () => {
      var matches = lomatch.LoMatch(Infinity, Infinity, []);
      var expectedMatch = {func: '_.toNumber'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toSafeInteger', () => {
    it('with an integer', () => {
      var matches = lomatch.LoMatch(3.2, 3, []);
      var expectedMatch = {func: '_.toSafeInteger'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with infinity', () => {
      var matches = lomatch.LoMatch(Infinity, 9007199254740991, []);
      var expectedMatch = {func: '_.toSafeInteger'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toString', () => {
    it('with an integer', () => {
      var matches = lomatch.LoMatch(3.2, '3.2', []);
      var expectedMatch = {func: '_.toString'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with an array', () => {
      var matches = lomatch.LoMatch([1, 2, 3], '1,2,3', []);
      var expectedMatch = {func: '_.toString'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it("with a weird 'number'", () => {
      var matches = lomatch.LoMatch(-0, '-0', []);
      var expectedMatch = {func: '_.toString'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
});
