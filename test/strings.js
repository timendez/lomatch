const _ = require('lodash');
const expect = require('chai').expect;
const lomatch = require('../lomatch.js');

describe('Strings', () => {
  describe('_.camelCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('Foo Bar', 'fooBar', []);
      var expectedMatch = {func: '_.camelCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a gross string', () => {
      var matches = lomatch.LoMatch('__FOO--__BAR-_----_', 'fooBar', []);
      var expectedMatch = {func: '_.camelCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.capitalize', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('FOOBAR', 'Foobar', []);
      var expectedMatch = {func: '_.capitalize'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.deburr', () => {
    it('with a string containing Latin-1 Supplements and Latin Extended-A characters', () => {
      var matches = lomatch.LoMatch('déjà vu', 'deja vu', []);
      var expectedMatch = {func: '_.deburr'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.endsWith', () => {
    it('without a secondary predicate evaluating to true', () => {
      var matches = lomatch.LoMatch('abc', true, []);
      var expectedMatch = {func: '_.endsWith', predicates: 'c'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.escape', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('fred, barney, & pebbles', 'fred, barney, &amp; pebbles', []);
      var expectedMatch = {func: '_.escape'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.escapeRegExp', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('[lomatch](https://github.com/timendez/lomatch)', "\[lomatch\]\(https://github.com/timendez/\lomatch\)", []);
      var expectedMatch = {func: '_.escape'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.kebabCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('Foo Bar', 'foo-bar', []);
      var expectedMatch = {func: '_.kebabCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a gross string', () => {
      var matches = lomatch.LoMatch('__FOO_BAR__', 'foo-bar', []);
      var expectedMatch = {func: '_.kebabCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a camelCase string', () => {
      var matches = lomatch.LoMatch('fooBar', 'foo-bar', []);
      var expectedMatch = {func: '_.kebabCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.lowerCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('Foo BaR', 'foo ba r', []);
      var expectedMatch = {func: '_.lowerCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a gross string', () => {
      var matches = lomatch.LoMatch('__FOO_BAR__', 'foo bar', []);
      var expectedMatch = {func: '_.lowerCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.lowerFirst', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('Tacos Are Delicious', 'tacos Are Delicious', []);
      var expectedMatch = {func: '_.lowerFirst'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.pad', () => {
    it('with a single predicate', () => {
      var matches = lomatch.LoMatch('abc', '  abc   ', []);
      var expectedMatch = {func: '_.pad', predicates: 8};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.padEnd', () => {
    it('with a single predicate', () => {
      var matches = lomatch.LoMatch('abc', 'abc   ', []);
      var expectedMatch = {func: '_.padEnd', predicates: 6};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.padStart', () => {
    it('with a single predicate', () => {
      var matches = lomatch.LoMatch('abc', '   abc', []);
      var expectedMatch = {func: '_.padStart', predicates: 6};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.parseInt', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('0008', 8, []);
      var expectedMatch = {func: '_.parseInt'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.repeat', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('*', '***', []);
      var expectedMatch = {func: '_.repeat', predicates: 3};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.snakeCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('Foo Bar', 'foo_bar', []);
      var expectedMatch = {func: '_.snakeCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
    it('with a gross string', () => {
      var matches = lomatch.LoMatch('--FOO-BAR--', 'foo_bar', []);
      var expectedMatch = {func: '_.snakeCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.startCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('the quick brown fox jumped over the lazy dog', 'The Quick Brown Fox Jumped Over The Lazy Dog', []);
      var expectedMatch = {func: '_.startCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.startsWith', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('abc', true, []);
      var expectedMatch = {func: '_.startsWith', predicates: 'a'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toLower', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('--FoO-BaR--', '--foo-bar--', []);
      var expectedMatch = {func: '_.toLower'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.toUpper', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('--FoO-BaR--', '--FOO-BAR--', []);
      var expectedMatch = {func: '_.toUpper'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.trim', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('  a b c    ', 'a b c', []);
      var expectedMatch = {func: '_.trim'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.trimEnd', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('abc    ', 'abc', []);
      var expectedMatch = {func: '_.trimEnd'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.trimStart', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('   abc', 'abc', []);
      var expectedMatch = {func: '_.trimStart'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.truncate', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('hi diddly ho there, neighborino', 'hi diddly ho there, neighbo...', []);
      var expectedMatch = {func: '_.truncate'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.unescape', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('fred, barney, &amp; pebbles', 'fred, barney, & pebbles', []);
      var expectedMatch = {func: '_.unescape'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.upperCase', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('__foo-bar__', 'FOO BAR', []);
      var expectedMatch = {func: '_.upperCase'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.upperFirst', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('tacos are tasty', 'Tacos are tasty', []);
      var expectedMatch = {func: '_.upperFirst'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
  describe('_.words', () => {
    it('with a normal string', () => {
      var matches = lomatch.LoMatch('fred, barney, & pebbles', ['fred', 'barney', 'pebbles'], []);
      var expectedMatch = {func: '_.words'};
      expect(matches).to.deep.include(expectedMatch);
    });
  });
});
