import 'core-js';

import normalizePath from './common/normalizePath';

/**
 * Set the value from given path string or array of properties
 *
 * @since 0.1.0
 * @param {Object} target Target object
 * @param {Array|string} propertyPath Property path
 * @param {*} [value] Property value
 * @returns {Object} Target with value set
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * > { 'a': [{ 'b': { 'c': 4 } }] }
 * 
 * set(object, 'a/0/b/c', 2) // or set(object, 'a\0\b\c', 2)
 * > { 'a': [{ 'b': { 'c': 2 } }] }
 *
 * set(object, ['a', '0', 'c'], 2)
 * > { 'a': [{ 'b': { 'c': 3 } }] }
 *
 */
const set = (target, propertyPath, value) => {
  let pathNormalized = normalizePath(propertyPath)

  if (pathNormalized) {
    const finalPath = pathNormalized.pop();

    const finalNode = pathNormalized.reduce((arr, next) => (arr[next] || (arr[next] = {}))  , target);

    finalNode[finalPath] = value;

    return target;
  }
}

export default set