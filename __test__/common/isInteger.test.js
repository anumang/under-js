import assert from 'assert';

import isInteger from '../../src/common/isInteger';

describe('isInteger', function() {

  it('should isInteger with numbers', function() {
    assert.strictEqual(isInteger(1), true);

    assert.strictEqual(isInteger(0), true);
    assert.strictEqual(isInteger(-0), true);
    assert.strictEqual(isInteger(+0), true);

    assert.strictEqual(isInteger(-1), true);

    assert.strictEqual(isInteger(0), true);

    assert.strictEqual(isInteger(0.1), false);
    assert.strictEqual(isInteger(-0.1), false);

    assert.strictEqual(isInteger(1.1), false);
    assert.strictEqual(isInteger(-1.1), false);
  });

  it('should isInteger with number strings', function() {
    assert.strictEqual(isInteger('1'), true);

    assert.strictEqual(isInteger('0'), true);
    assert.strictEqual(isInteger('-0'), true);
    assert.strictEqual(isInteger('+0'), true);

    assert.strictEqual(isInteger('-1'), true);

    assert.strictEqual(isInteger('0'), true);

    assert.strictEqual(isInteger('0.1'), false);
    assert.strictEqual(isInteger('-0.1'), false);

    assert.strictEqual(isInteger('1.1'), false);
    assert.strictEqual(isInteger('-1.1'), false);
  });

  it('should isInteger with falsyfy values', function() {
    assert.strictEqual(isInteger('a'), false);

    assert.strictEqual(isInteger('null'), false);
    assert.strictEqual(isInteger('undefined'), false);
    assert.strictEqual(isInteger('false'), false);
    assert.strictEqual(isInteger('true'), false);

    assert.strictEqual(isInteger(undefined), false);
    assert.strictEqual(isInteger(null), false);
    assert.strictEqual(isInteger(void 0), false);

    assert.strictEqual(isInteger(true), false);
    assert.strictEqual(isInteger(false), false);
  });
});