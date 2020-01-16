import assert from 'assert';

import normalizePath from '../../src/common/normalizePath';

describe('normalizePath', function() {

  it('should normalizePath single path', function() {
    assert.deepEqual(normalizePath('a'), ['a']);
  });

  it('should normalizePath single index', function() {
    assert.deepEqual(normalizePath('0'), ['0']);
  });

  it('should normalizePath deep path with dot', function() {
    assert.deepEqual(normalizePath('a.b'), ['a', 'b']);
  });

  it('should normalizePath deep path with dot indexes', function() {
    assert.deepEqual(normalizePath('a.[0]'), ['a', '0']);

    assert.deepEqual(normalizePath('a.1'), ['a', '1']);
  });

  it('should normalizePath deep path with comma', function() {
    assert.deepEqual(normalizePath('a,b'), ['a', 'b']);
  });

  it('should normalizePath deep path with comma indexes', function() {
    assert.deepEqual(normalizePath('a,[0]'), ['a', '0']);

    assert.deepEqual(normalizePath('a,0'), ['a', '0']);
  });

  it('should normalizePath deep path with slashes', function() {
    assert.deepEqual(normalizePath('a/b'), ['a', 'b']);

    assert.deepEqual(normalizePath('a\\c'), ['a', 'c']);
  });

  it('should normalizePath deep path with slashes indexes', function() {
    assert.deepEqual(normalizePath('a/[0]'), ['a', '0']);

    assert.deepEqual(normalizePath('a\\0'), ['a', '0']);

    assert.deepEqual(normalizePath('a/1'), ['a', '1']);
  });


  it('should normalizePath deep path with array', function() {
    assert.deepEqual(normalizePath(['a', 'b']), ['a', 'b']);
  });
});