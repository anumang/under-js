import assert from 'assert';

import isNil from '../src/isNil';

describe('isNill', function() {

  it('should response set with null', function() {
    assert.equal(isNil(null), true);
  });

  it('should response set with undefined', function() {
    assert.equal(isNil(undefined), true);
  });

  it('should response set with void 0', function() {
    assert.equal(isNil(void 0), true);
  });

  it('should response unseset with zero', function() {
    assert.equal(isNil(0), false);
  });

  it('should response unseset with empty string', function() {
    assert.equal(isNil(''), false);
  });

  it('should response unseset with false boolean', function() {
    assert.equal(isNil(false), false);
  });
});