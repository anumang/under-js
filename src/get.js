import 'core-js';

import normalizePath from './common/normalizePath';

import isNil from './isNil';

/**
 * Resolve the value from given path string or array of properties
 *
 * @since 0.1.0
 * @param {Object} target Target object
 * @param {Array|string} propertyPath Property path
 * @param {*} [defaultValue] Default
 * @returns {*} Path vartiable || default
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * > 3
 * 
 * get(object, 'a/0/b/c') // or get(object, 'a\0\b\c')
 * > 3
 *
 * get(object, ['a', '0', 'c'], 2)
 * > 2
 *
 */
const get = (target, propertyPath, defaultValue) => {
  let pathNormalized = normalizePath(propertyPath)

  if (pathNormalized) {
    const result = pathNormalized.reduce((arr, next) => (arr && !isNil(arr[next]) ? arr[next] : undefined) , target);

    return isNil(result) ? defaultValue : result;
  }
}

export default get