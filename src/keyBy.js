import 'core-js';

/**
 * Convert array of objects to map object by given key property
 *
 * @since 0.1.0
 * @param {Array} target Array of objects
 * @param {string} keyProp Key property
  * @param {Function} transformer Transform function
 * @returns {Object} Key mapped object
 * @example
 *
 * const arr = [{a: 1}, {a: 2, b: 3}, {a: 3, b: 4}]
 *
 * keyBy(arr, 'a')
 * > {1: {a: 1}, 2: {a: 2, b: 3}, 3: {a: 3, b: 4}}
 * 
 * keyBy(arr, 'b')
 * > {undefined: {a: 1}, 3: {a: 2, b: 3}, 4: {a: 3, b: 4}}
 *
 * keyBy(arr, 'b', (keyVal) => keyVal || 'NaN')
 * > {NaN: {a: 1}, 3: {a: 2, b: 3}, 4: {a: 3, b: 4}}
 *
 */
const keyBy = (target, keyProp, transformer) => {
  let targetKeysMap;

  if(!Array.isArray(target)
  || !(targetKeysMap = target
      .filter(el => el instanceof Object)
      .map(el => transformer
        ? [transformer(el[keyProp]), el]
        : [el[keyProp], el]
        )).length
  ) return {};

  return targetKeysMap.reduce((arr, next) => arr[next[0]]
    ? Object.assign(arr, Array.isArray(arr[next[0]])
      ? {[`${next[0]}`]:[...arr[next[0]], next[1]]}
      : {[`${next[0]}`]: [arr[next[0]], next[1]]})
    : Object.assign(arr, {[`${next[0]}`]: next[1]}), {});
}

export default keyBy