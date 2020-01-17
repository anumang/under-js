import assert from 'assert';

import diff from '../src/diff';

describe('diff', function() {

  it('should diff arrays', function() {
    assert.deepEqual(diff([1,2,3], [1]), [2, 3]);

    assert.deepEqual(diff([1,2,3], [1, 2]), [3]);

    assert.deepEqual(diff([1,2,3], [1, 2, 3]), []);
  });

  it('should diff arrays with comparator', function() {
    assert.deepEqual(diff([1,2,3], [1], (c1, c2) => c1 == (c2 + 1)), [1, 3]);
    assert.deepEqual(diff([1,2,3], [1], () => true), []);
  });

  it('should diff arrays with empty', function() {
    assert.deepEqual(diff([], [1]), []);

    assert.deepEqual(diff([1,2,3], []), [1, 2, 3]);
  });

  it('should diff arrays with falsyfy', function() {
    assert.deepEqual(diff([false], [false]), []);

    assert.deepEqual(diff([false], [0]), [false]);

    assert.deepEqual(diff([false], [undefined]), [false]);

    assert.deepEqual(diff([false]), [false]);

    assert.deepEqual(diff(false, [false]), []);
  });

});