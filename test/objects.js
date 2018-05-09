const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Objects', () => {
  describe('_.assign', () => {
    it('with two objects', () => {
      var matches = lomatch.LoMatch({'a': 0}, {'a': 0, 'b': 1}, []);
      var expectedMatch = {func: '_.assign', predicates: {'b': 1}};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.at', () => {
    it('with a complex deep object', () => {
      var matches = lomatch.LoMatch({ 'a': [{ 'b': { 'c': 3 } }, 4] }, [3, 4], []);
      var expectedMatch = {func: '_.at', predicates: ['a[0].b.c', 'a[1]']};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.findKey', () => {
    it('with the _.matches iteratee shorthand', () => {
      var users = {
        'barney':  { 'age': 36, 'active': true },
        'fred':    { 'age': 40, 'active': false },
        'pebbles': { 'age': 1,  'active': true }
      };
      var matches = lomatch.LoMatch(users, 'pebbles', []);
      var expectedMatch = {func: '_.findKey', predicates: { 'age': 1, 'active': true }};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.findLastKey', () => {
    it('with the _.matches iteratee shorthand', () => {
      var users = {
        'barney':  { 'age': 36, 'active': true },
        'fred':    { 'age': 40, 'active': false },
        'pebbles': { 'age': 1,  'active': true }
      };
      var matches = lomatch.LoMatch(users, 'barney', []);
      var expectedMatch = {func: '_.findLastKey', predicates: { 'age': 36, 'active': true }};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.get', () => {
    it('with a normal object', () => {
      var object = { 'a': [{ 'b': { 'c': 3 } }] };
      var matches = lomatch.LoMatch(object, 3, []);
      var expectedMatch = {func: '_.get', predicates: 'a[0].b.c'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.has', () => {
    it('with a normal object', () => {
      var object = { 'a': { 'b': 2 } };
      var matches = lomatch.LoMatch(object, true, []);
      var expectedMatch = {func: '_.has', predicates: 'a'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.invert', () => {
    it('with a normal object', () => {
      var object = { 'a': 1, 'b': 2, 'c': 1 };
      var matches = lomatch.LoMatch(object, { '1': 'c', '2': 'b' }, []);
      var expectedMatch = {func: '_.invert'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.invertBy', () => {
    it('with a normal object', () => {
      var object = { 'a': 1, 'b': 2, 'c': 1 };
      var matches = lomatch.LoMatch(object, { '1': ['a', 'c'], '2': ['b'] }, []);
      var expectedMatch = {func: '_.invertBy'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.keys', () => {
    it('with a normal object', () => {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      var matches = lomatch.LoMatch(object, ['a', 'b', 'c'], []);
      var expectedMatch = {func: '_.keys'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.keysIn', () => {
    it('with a normal object', () => {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      var matches = lomatch.LoMatch(object, ['a', 'b', 'c'], []);
      var expectedMatch = {func: '_.keys'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.omit', () => {
    it('with a flat object', () => {
      var object = { 'a': 1, 'b': '2', 'c': 3 };
      var matches = lomatch.LoMatch(object, {'b': '2'}, []);
      var expectedMatch = {func: '_.omit', predicates: ['a', 'c']};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.pick', () => {
    it('with an object', () => {
      var object = { 'a': 1, 'b': '2', 'c': 3 };
      var matches = lomatch.LoMatch(object, {'a': 1, 'c': 3}, []);
      var expectedMatch = {func: '_.pick', predicates: ['a', 'c']};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.result', () => {
    it('with an object', () => {
      var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
      var matches = lomatch.LoMatch(object, 3, []);
      var expectedMatch = {func: '_.result', predicates: 'a[0].b.c1'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toPairs', () => {
    it('with an object', () => {
      var object = {
        taco: 'bell',
        del: 'taco',
      };
      var matches = lomatch.LoMatch(object, [ [ 'taco', 'bell' ], [ 'del', 'taco' ] ], []);
      var expectedMatch = {func: '_.toPairs'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toPairsIn', () => {
    it("with an object with the object's prototype", () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      var matches = lomatch.LoMatch(new Foo(), [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ], []);
      var expectedMatch = {func: '_.toPairsIn'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.unset', () => {
    it('with an object', () => {
      var object = { 'a': [{ 'b': { 'c': 7 } }] };
      var matches = lomatch.LoMatch(object, { 'a': [{ 'b': {} }] }, []);
      var expectedMatch = {func: '_.unset', predicates: 'a[0].b.c'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.values', () => {
    it('with an object', () => {
      var object = {taco: 'bell', del: 'taco'};
      var matches = lomatch.LoMatch(object, ['bell', 'taco'], []);
      var expectedMatch = {func: '_.values'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.valuesIn', () => {
    it('with an object', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      var matches = lomatch.LoMatch(new Foo(), [1, 2, 3], []);
      var expectedMatch = {func: '_.valuesIn'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
});
