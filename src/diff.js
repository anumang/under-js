import 'core-js';

/**
 * Differences operation first from second between array of values
 *
 * @since 0.1.0
 * @param {Array} include Included values
 * @param {Array} exclude Excluded values
 * @param {Function} differBy Evaluator predicate
 * @returns {Array} Difference resultt
 * @example
 *
 * const arr = [1,2,3]
 *
 * diff(arr, [1])
 * > [2, 3]
 * 
 * diff(arr, [1,2])
 * > [3]
 *
 * diff(arr, [1,2], (c1, c2) => c1 == (c2 + 1))
 * > [1]
 *
 */
const diff = (include, exclude, differBy) => {
  if(!Array.isArray(include)) return [];
  if(!Array.isArray(exclude)) return include;

  const differEval = differBy instanceof Function
    ? (v1) => !exclude.find(v2 => differBy(v1, v2))
    : (v1) => !exclude.includes(v1);

  return include.filter(differEval);
}

export default diff