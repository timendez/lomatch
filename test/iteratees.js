const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Iteratees as predicates', () => {
  describe('with arrays', () => {
    describe('_.uniqBy', () => {
      it('with floor', () => {
        var matches = lomatch.LoMatch([2.1, 1.2, 2.3], [2.1, 1.2], []);
        var expectedMatch = '_.floor';
        var targetMatch = _.find(matches, ['func', '_.uniqBy']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
    describe('_.unzipWith', () => {
      it('with add', () => {
        var matches = lomatch.LoMatch([[1, 10, 100], [2, 20, 200]], [3, 30, 300], []);
        var expectedMatch = '_.floor';
        var targetMatch = _.find(matches, ['func', '_.unzipWith']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include('_.add');
      });
    });
    describe('_.sortedUniqBy', () => {
      it('with floor', () => {
        var matches = lomatch.LoMatch([1.1, 1.2, 2.3, 2.4], [1.1, 2.3], []);
        var expectedMatch = '_.floor';
        var targetMatch = _.find(matches, ['func', '_.sortedUniqBy']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include('_.floor');
      });
    });
  });

  describe('with objects', () => {
    describe('_.invertBy', () => {
      it('with floor', () => {
        var matches = lomatch.LoMatch({ 'a': '1.2', 'b': '2.2', 'c': '1.7' }, { 1: [ 'a', 'c' ], 2: [ 'b' ] }, []);
        var expectedMatch = '_.floor';
        var targetMatch = _.find(matches, ['func', '_.invertBy']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
    describe('_.mapKeys', () => {
      it('with sum', () => {
        var matches = lomatch.LoMatch({ 1: 2, 3: 4 }, { 0: 4 }, []);
        var expectedMatch = '_.sum';
        var targetMatch = _.find(matches, ['func', '_.mapKeys']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
    describe('_.mapValues', () => {
      it('with add', () => {
        var matches = lomatch.LoMatch({ key: ' value' }, { key: ' valuekey' }, []);
        var expectedMatch = '_.add';
        var targetMatch = _.find(matches, ['func', '_.mapValues']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
    describe('_.omitBy', () => {
      it('with isNumber', () => {
        var matches = lomatch.LoMatch({ str: 'hello', num1: 3, num2: 5 }, { str: 'hello' }, []);
        var expectedMatch = '_.isNumber';
        var targetMatch = _.find(matches, ['func', '_.omitBy']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
    describe('_.pickBy', () => {
      it('with isNumber', () => {
        var matches = lomatch.LoMatch({ str: 'hello', num1: 3, num2: 5 }, { num1: 3, num2: 5 }, []);
        var expectedMatch = '_.isNumber';
        var targetMatch = _.find(matches, ['func', '_.pickBy']);
        expect(targetMatch).to.have.a.property('iteratees');
        expect(targetMatch.iteratees).to.include(expectedMatch);
      });
    });
  });
});
