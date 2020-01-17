import assert from 'assert';

import keyBy from '../src/keyBy';

describe('keyBy', function() {

  it('should keyBy array of objects', function() {
    assert.deepEqual(keyBy([{a: 1}, {a: 2}], 'a'), {1: {a: 1}, 2: {a: 2}});

    assert.deepEqual(keyBy([{a: 1}, {a: 2, b: 2}], 'a'), {1: {a: 1}, 2: {a: 2, b: 2}});
  });

  it('should keyBy array of objects with falsyfy keys', function() {
    assert.deepEqual(keyBy([{false: 'a'}], false), {'a': {false: 'a'}});

    assert.deepEqual(keyBy([{a: false}], 'a'), {false: {a: false}});

    assert.deepEqual(keyBy([{undefined: 1}], undefined), {1: {undefined: 1}});

    assert.deepEqual(keyBy([{1: undefined}], 1), {undefined: {1: undefined }});

    assert.deepEqual(keyBy([{0: 1}], 0), {1: {0: 1}});

    assert.deepEqual(keyBy([{1: 0}], 1), {0: {1: 0 }});
  });

  it('should keyBy array of objects with non-exist key', function() {
    assert.deepEqual(keyBy([{a: 1}, {b: 2}], 'b'), {undefined: {a: 1}, 2: {b: 2}});
  });

  it('should keyBy array of objects with transformer', function() {
    assert.deepEqual(keyBy([{a: 1}, {a: 2}], 'a', (keyVal) => keyVal + 1), {2: {a: 1}, 3: {a: 2}});
  });

  it('should keyBy array of objects with duplicates', function() {
    assert.deepEqual(keyBy([{a: 1}, {a: 1}], 'a'), {1: [{a: 1}, {a: 1}]});

    assert.deepEqual(keyBy([{a: 1}, {a: 1}, {b: 1}], 'a'), {1: [{a: 1}, {a: 1}], undefined: {b: 1}});

    assert.deepEqual(keyBy([{a: 1}, {a: 1}, {b: 1}], 'b'), {undefined: [{a: 1}, {a: 1}], 1: {b: 1}});

    assert.deepEqual(keyBy([{a: 1}, {a: 1}, {a: 2}, {b: 1}], 'b'), {undefined: [{a: 1}, {a: 1}, {a: 2}], 1: {b: 1}});
  });

});