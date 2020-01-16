import assert from 'assert';

import pick from '../src/pick';

describe('pick', function() {

  it('should pick with single key', function() {
    assert.deepEqual(pick({a: 1}, 'a'), {a: 1});

    assert.deepEqual(pick({a: 1}, 'b'), {});
  });

  it('should pick with array ', function() {
    assert.deepEqual(pick({a: 1, b: 2}, ['a', 'b']), {a: 1, b: 2});

    assert.deepEqual(pick({a: 1, b: 2}, ['a', 'c']), {a: 1});

    assert.deepEqual(pick({a: 1, b: 2}, ['c']), {});
  });

  it('should pick with predicate', function() {
    assert.deepEqual(pick({a: 1, b: 2}, () => true), {a: 1, b: 2});

    assert.deepEqual(pick({a: 1, b: 2}, () => false), {});

    assert.deepEqual(pick({a: 1, b: 2}, (val) => val % 2), {a: 1});
  });

  it('should pick with invalid', function() {
    assert.deepEqual(pick('a', 'a'), {});

    assert.deepEqual(pick(false), {});

    assert.deepEqual(pick(), {});
  });

});