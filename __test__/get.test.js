import assert from 'assert';

import get from '../src/get';

describe('get', function() {

  it('should get single path with default', function() {
    assert.equal(get({a: 1}, 'a'), 1);

    assert.equal(get({a: 1}, 'b', 2), 2);
  });

  it('should get single index with default', function() {
    assert.equal(get([1], '0'), 1);

    assert.equal(get([1], '1', 2), 2);
  });

  it('should get deep path with dot with default', function() {
    assert.equal(get({a: {b: 2}}, 'a.b'), 2);

    assert.equal(get({a: {b: 2}}, 'a.c', 3), 3);
  });

  it('should get deep path with dot indexes with default', function() {
    assert.equal(get({a: [2]}, 'a.[0]'), 2);

    assert.equal(get({a: [2]}, 'a.0'), 2);

    assert.equal(get({a: [2]}, 'a.1', 3), 3);
  });

  it('should get deep path with comma with default', function() {
    assert.equal(get({a: {b: 2}}, 'a,b'), 2);

    assert.equal(get({a: {b: 2}}, 'a,c', 3), 3);
  });

  it('should get deep path with comma indexes with default', function() {
    assert.equal(get({a: [2]}, 'a,[0]'), 2);

    assert.equal(get({a: [2]}, 'a,0'), 2);

    assert.equal(get({a: [2]}, 'a,1', 3), 3);
  });

  it('should get deep path with slashes with default', function() {
    assert.equal(get({a: {b: 2}}, 'a/b'), 2);

    assert.equal(get({a: {b: 2}}, 'a\\c', 3), 3);
  });

  it('should get deep path with slashes indexes with default', function() {
    assert.equal(get({a: [2]}, 'a/[0]'), 2);

    assert.equal(get({a: [2]}, 'a\\0'), 2);

    assert.equal(get({a: [2]}, 'a/1', 3), 3);
  });


  it('should get deep path with array with default', function() {
    assert.equal(get({a: {b: 2}}, ['a', 'b']), 2);

    assert.equal(get({a: {b: 2}}, ['a', 'c'], 3), 3);
  });

  it('should get deep path with array indexes with default', function() {
    assert.equal(get({a: [2]}, ['a', 0]), 2);

    assert.equal(get({a: [2]}, ['a', '0']), 2);

    assert.equal(get({a: [2]},  ['a', '1'], 3), 3);
  });

  it('should get false values ', function() {
    assert.equal(get({a: false}, 'a'), false);

    assert.equal(get({a: ''}, 'a'), '');

    assert.equal(get({a: 0}, 'a'), 0);
  });

});