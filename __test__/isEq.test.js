import assert from 'assert';

import isEq from '../src/isEq';

describe('isEq', function() {

  it('should isEq without eqStrict', function() {
    assert.strictEqual(isEq([1,false], [1, false]), true);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: false}), true);
    assert.strictEqual(isEq([1, false], [1, false]), true);
    assert.strictEqual(isEq({a: 1, b: false}, {a: 1, b: false}), true);
    
    assert.strictEqual(isEq([1,false], [1, 0]), true);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: 0}), true);
    assert.strictEqual(isEq([1, 0], [1, false]), true);
    assert.strictEqual(isEq({a: 1,b: 0}, {a: 1, b: false}), true);

    assert.strictEqual(isEq([1,false], [1, ""]), true);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: ""}), true);
    assert.strictEqual(isEq([1, ""], [1, false]), true);
    assert.strictEqual(isEq({a: 1,b: ""}, {a: 1, b: false}), true);

    assert.strictEqual(isEq([1,undefined], [1, undefined]), true);
    assert.strictEqual(isEq([1,null], [1, null]), true);
    assert.strictEqual(isEq([1,undefined], [1, null]), true);
    assert.strictEqual(isEq({a: 1,b: undefined}, {a: 1, b: null}), true);
    assert.strictEqual(isEq([1, null], [1, undefined]), true);
    assert.strictEqual(isEq({a: 1,b: null}, {a: 1, b: undefined}), true);

    // Array with toString
    assert.strictEqual(isEq([1, null], '1,'), true);
    assert.strictEqual(isEq([1, undefined], '1,'), true);
    assert.strictEqual(isEq([1, 2], '1,2'), true);

    // String with numbers
    assert.strictEqual(isEq([1, 23, 0], ['1', '23', '0']), true);
    assert.strictEqual(isEq(['1', '23', '0'], [1, 23, 0]), true);
    assert.strictEqual(isEq({a: 1, b: 23, c:0}, {a: '1', b: '23', c: '0'}), true);
    assert.strictEqual(isEq({a: '1', b:'23', c:'0'}, {a: 1, b: 23, c: 0}), true);

    // String with constructor
    assert.strictEqual(isEq(new String('foo'), new String('foo')), false);
    assert.strictEqual(isEq(new String('foo'), 'foo'), true);
    assert.strictEqual(isEq('foo', new String('foo')), true);
    assert.strictEqual(isEq('foo', 'foo'), true);
  });

  it('should isEq with eqStrict', function() {
    assert.strictEqual(isEq([1,false], [1, false], {eqStrict: true}), true);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: false}, {eqStrict: true}), true);
    assert.strictEqual(isEq([1, false], [1, false], {eqStrict: true}), true);
    assert.strictEqual(isEq({a: 1, b: false}, {a: 1, b: false}, {eqStrict: true}), true);
    
    assert.strictEqual(isEq([1,false], [1, 0], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: 0}, {eqStrict: true}), false);
    assert.strictEqual(isEq([1, 0], [1, false], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: 0}, {a: 1, b: false}, {eqStrict: true}), false);

    assert.strictEqual(isEq([1,false], [1, ""], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: false}, {a: 1, b: ""}, {eqStrict: true}), false);
    assert.strictEqual(isEq([1, ""], [1, false], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: ""}, {a: 1, b: false}, {eqStrict: true}), false);

    assert.strictEqual(isEq([1,undefined], [1, undefined], {eqStrict: true}), true);
    assert.strictEqual(isEq([1,null], [1, null], {eqStrict: true}), true);
    assert.strictEqual(isEq([1,undefined], [1, null], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: undefined}, {a: 1, b: null}, {eqStrict: true}), false);
    assert.strictEqual(isEq([1, null], [1, undefined], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1,b: null}, {a: 1, b: undefined}, {eqStrict: true}), false);

    // Array with toString
    assert.strictEqual(isEq([1, null], '1,', {eqStrict: true}), false);
    assert.strictEqual(isEq([1, undefined], '1,', {eqStrict: true}), false);
    assert.strictEqual(isEq([1, 2], '1,2', {eqStrict: true}), false);

    // String with numbers
    assert.strictEqual(isEq([1, 23, 0], ['1', '23', '0'], {eqStrict: true}), false);
    assert.strictEqual(isEq(['1', '23', '0'], [1, 23, 0], {eqStrict: true}), false);
    assert.strictEqual(isEq({a: 1, b: 23, c:0}, {a: '1', b: '23', c: '0'}, {eqStrict: true}), false);
    assert.strictEqual(isEq({a: '1', b:'23', c:'0'}, {a: 1, b: 23, c: 0}, {eqStrict: true}), false);

    // String with constructor
    assert.strictEqual(isEq(new String('foo'), new String('foo'), {eqStrict: true}), false);
    assert.strictEqual(isEq(new String('foo'), 'foo', {eqStrict: true}), false);
    assert.strictEqual(isEq('foo', new String('foo'), {eqStrict: true}), false);
    assert.strictEqual(isEq('foo', 'foo', {eqStrict: true}), true);
  });

  it('should isEq with/o eqNaN', function() {
    // With eqNaN
    assert.strictEqual(isEq(NaN, NaN, {eqNaN: true}), true);
    assert.strictEqual(isEq([1,NaN], [1, NaN], {eqNaN: true}), true);
    assert.strictEqual(isEq({a: 1,b: NaN}, {a: 1, b: NaN}, {eqNaN: true}), true);
    assert.strictEqual(isEq([1,NaN], [1, 0], {eqNaN: true}), false);
    assert.strictEqual(isEq({a: 1,b: 0}, {a: 1, b: NaN}, {eqNaN: true}), false);

    // Without eqNaN
    assert.strictEqual(isEq(NaN, NaN, {eqNaN: false}), false);
    assert.strictEqual(isEq([1,NaN], [1, NaN], {eqNaN: false}), false);
    assert.strictEqual(isEq({a: 1,b: NaN}, {a: 1, b: NaN}, {eqNaN: false}), false);
    assert.strictEqual(isEq([1,NaN], [1, 0], {eqNaN: false}), false);
    assert.strictEqual(isEq({a: 1,b: 0}, {a: 1, b: NaN}, {eqNaN: false}), false);
  });


  it('should isEq with/o eqZero', function() {
    // With eqZero
    assert.strictEqual(isEq(0, 0, {eqZero: true}), true);
    assert.strictEqual(isEq([1,0], [1, -0], {eqZero: true}), true);
    assert.strictEqual(isEq({a: 1,b: +0}, {a: 1, b: 0}, {eqZero: true}), true);
    assert.strictEqual(isEq([1, -0], [1, +0], {eqZero: true}), true);
    assert.strictEqual(isEq({a: 1,b: +0}, {a: 1, b: -0}, {eqZero: true}), true);

    // Without eqZero
    assert.strictEqual(isEq(0, 0, {eqZero: false}), true);
    assert.strictEqual(isEq([1,0], [1, -0], {eqZero: false}), false);
    assert.strictEqual(isEq({a: 1,b: +0}, {a: 1, b: 0}, {eqZero: false}), true);
    assert.strictEqual(isEq([1, -0], [1, +0], {eqZero: false}), false);
    assert.strictEqual(isEq({a: 1,b: +0}, {a: 1, b: -0}, {eqZero: false}), false);
  });

  it('should isEq with excludes', function() {
    assert.strictEqual(isEq({a: 1, b: 2}, {a: 1, b: 3}, {excludes: []}), false);
    assert.strictEqual(isEq({a: 1, b: { c: 2}}, {a: 1, b: { c: 1}}, {excludes: []}), false);

    assert.strictEqual(isEq({a: 1, b: 2}, {a: 1, b: 3}, {excludes: ['b']}), true);
    assert.strictEqual(isEq({a: 1, b: { c: 2}}, {a: 1, b: { c: 1}}, {excludes: ['c']}), true);
  });
});