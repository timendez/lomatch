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
  });
});
