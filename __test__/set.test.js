import assert from 'assert';

import set from '../src/set';

describe('set', function() {

  it('should set single path', function() {
    assert.deepEqual(set({a: 1}, 'a', 2), {a: 2});

    assert.deepEqual(set({a: 1}, 'b', 2), {a: 1, b: 2});
  });

  it('should set deep path with dot', function() {
    assert.deepEqual(set({a: {b: 2}}, 'a.b', 3), {a: {b: 3}});

    assert.deepEqual(set({a: {b: 2}}, 'a.c', 3), {a: {b: 2, c: 3}});
  });

  it('should set deep path with dot indexes', function() {
    assert.deepEqual(set({a: [2]}, 'a.[0]', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a.0', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a.1', 3), {a: [2, 3]});
  });

  it('should set deep path with comma', function() {
    assert.deepEqual(set({a: [2]}, 'a,[0]', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a,0', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a,1', 3), {a: [2, 3]});
  });


  it('should set deep path with slashes with default', function() {
    assert.deepEqual(set({a: {b: 2}}, 'a/b', 3), {a: {b: 3}});

    assert.deepEqual(set({a: {b: 2}}, 'a\\c', 3), {a: {b: 2, c: 3}});
  });

  it('should set deep path with slashes indexes with default', function() {
    assert.deepEqual(set({a: [2]}, 'a/[0]', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a\\0', 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, 'a/1', 3), {a: [2, 3]});
  });


  it('should set deep path with array with default', function() {
    assert.deepEqual(set({a: {b: 2}}, ['a', 'b'], 3), {a: {b: 3}});

    assert.deepEqual(set({a: {b: 2}}, ['a', 'c'], 3), {a: {b: 2, c: 3}});
  });

  it('should set deep path with array indexes with default', function() {
    assert.deepEqual(set({a: [2]}, ['a', 0], 3), {a: [3]});

    assert.deepEqual(set({a: [2]}, ['a', '0'], 3), {a: [3]});

    assert.deepEqual(set({a: [2]},  ['a', '1'], 3), {a: [2, 3]});
  });

  it('should set false values ', function() {
    assert.deepEqual(set({a: false}, 'a', 2), {a: 2});

    assert.deepEqual(set({a: ''}, 'a', 2), {a: 2});

    assert.deepEqual(set({a: 0}, 'a', 2), {a: 2});
  });

});