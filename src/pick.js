import 'core-js';

/**
 * Pick from object by any of keys array, key string or predicate function
 *
 * @since 0.1.0
 * @param {Object} target Target object
 * @param {Array|string|Function} picks Pick inputs
 * @returns {Object} Result object
 * @example
 *
 * const object = { 'a': 0, 'b': 1, 'c': 2 }] }
 *
 * pick(object, 'a')
 * > {a: 0}
 * 
 * pick(object, ['a', 'b'])
 * > {a: 0, b: 1}
 *
 * pick(object, Boolean)
 * > {b: 1, c: 2}
 *
 */
const pick = (target, picks) => {
  const picker = picks instanceof Function ? (key) => picks(target[key]) : (key) => Array.isArray(picks) ? picks.includes(key) : picks === key;

  return Object.keys(target || '').filter(key => picker(key)).reduce((arr, next) => (arr[next] = target[next]) && arr, {});
}

export default pick