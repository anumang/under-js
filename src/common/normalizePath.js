import 'core-js';

/**
 * Normalize Array|String property path
 *
 * @since 0.1.0
 * @param {Array|string} propertyPath Property path
 * @returns {Array} Normalized path
 * @example
 *
 * normalizePath('a[0].b.c')
 * > ['a', '0', 'b', 'c']
 * 
 * normalizePath('a/0/b/c')
 * > ['a', '0', 'b', 'c']
 *
 * normalizePath(['a', '0', 'c')
 * > ['a', '0', 'b', 'c']
 *
 */
const normalizePath = (propertyPath) => {
  if (propertyPath && propertyPath.length) {
    return Array.isArray(propertyPath) ? propertyPath : propertyPath.split(/[,\\[\].\/]/g).filter(Boolean);
  }

  return undefined;
}

export default normalizePath