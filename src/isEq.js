import 'core-js';

import isInteger from './common/isInteger';

/**
 * Compare objects equality with control over comparison algorithms in detail
 * (More details https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#A_model_for_understanding_equality_comparisons)
 *
 * @todo Modifier option parameter may added
 * @todo Special types may need to extend
 * 
 * @since 0.1.0
 * @param {*} first First object
 * @param {*} second Second object
 * @param {Object} [options={eqStrict: false, eqNaN: true, eqZero: true, excludes: []}] Customize params
 * @param {boolean} [options.eqStrict=false]
 *  Comparison with === strict operator
 * @param {boolean} [options.eqNaN=true]
 *  Comparison with NaN's equality (Object.is / SameValue / SameValueZero)
 * @param {boolean} [options.eqZero=true]
 *  Comparison with +/- 0's equality (== / === / SameValueZero)
 * @param {string[]} [options.excludes=[]]
 *  Comparison excluded field properties
 * @returns {boolean} Equality result
 * @example
 * 
 * // Comparison with default options:
 * // {eqStrict: false, eqNaN: true, eqZero: true, excludes: []}
 *
 * isEq({a: {b: c: '1'}}, {a: {b: c: 1}})
 * > true
 * 
 * isEq({a: false}, {a: 0})
 * > true
 *
 * isEq({a: ""}, {a: 0})
 * > true
 *
 * isEq({a: -0}, {a: 0})
 * > true
 * 
 * isEq({a: NaN}, {a: Nan})
 * > true
 * 
 * // Comparison with {eqStrict: true} with options:
 * // {eqStrict: true, eqNaN: true, eqZero: true, excludes: []}
 *
 * isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqStrict: true})
 * > false
 * 
 * isEq({a: false}, {a: 0}, {eqStrict: true})
 * > false
 *
 * isEq({a: ""}, {a: 0}, {eqStrict: true})
 * > false
 *
 * isEq({a: -0}, {a: 0}, {eqStrict: true})
 * > true
 * 
 * isEq({a: NaN}, {a: Nan}, {eqStrict: true})
 * > true
 *
 * // Comparison with {eqNaN: false} with options: 
 * // {eqStrict: false, eqNaN: false, eqZero: true, excludes: []}
 *
 * isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqNaN: false})
 * > true
 * 
 * isEq({a: false}, {a: 0}, {eqNaN: false})
 * > true
 *
 * isEq({a: ""}, {a: 0}, {eqNaN: false})
 * > true
 *
 * isEq({a: -0}, {a: 0}, {eqNaN: false})
 * > true
 * 
 * isEq({a: NaN}, {a: Nan}, {eqNaN: false})
 * > false
 * 
 * // Comparison with {eqZero: false} with options:
 * // {eqStrict: false, eqNaN: true, eqZero: false, excludes: []}
 *
 * isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqZero: false})
 * > true
 * 
 * isEq({a: false}, {a: 0}, {eqZero: false})
 * > true
 *
 * isEq({a: ""}, {a: 0}, {eqZero: false})
 * > true
 *
 * isEq({a: -0}, {a: 0}, {eqZero: false})
 * > false
 * 
 * isEq({a: NaN}, {a: Nan}, {eqZero: false})
 * > false
 * 
 * // Comparison custom excludes with options:
 * // {eqStrict: false, eqNaN: true, eqZero: true, excludes: []}
 *
 * isEq({a: {b: c: '1'}}, {a: {b: c: 2}}, {excludes: ['c']})
 * > true
 * 
 * isEq({a: 1}, {a: 0}, {excludes: ['a']})
 * > true
 * 
 */
const isEq = (first, second, options) => {
  const {eqStrict, eqNaN, eqZero, excludes} = Object.assign({eqStrict: false, eqNaN: true, eqZero: true, excludes: []}, options);

  // Function comparison allow only with references
  if (first instanceof Function || second instanceof Function) return first === second;

  // Special types needs exclusion
  const hasSpecialTypes = (first instanceof String || second instanceof String)
    || (first === null || second === null);

  if (!hasSpecialTypes && typeof first === 'object' && typeof second === 'object') {
    // Swaps for re-ordering
    const swaps = [];
    const keys = Object.keys(first).filter(key => !excludes.includes(key)).sort();

    if (keys.toString() === Object.keys(second).filter(key => !excludes.includes(key)).sort().toString()) {
      let nextKey;

      while((nextKey = keys.pop())) {
        if (isEq(first[nextKey], second[nextKey], options)) continue;

        let foundIteratedKey;

        // Array indexes order insensitive search
        if (isInteger(nextKey)
          && (foundIteratedKey = keys
            .find(iteratetKey => isInteger(iteratetKey)
              && isEq(first[nextKey], second[iteratetKey], options)))
        ) {
          swaps.push([foundIteratedKey, second[foundIteratedKey]]);

          second[foundIteratedKey] = second[nextKey];

          continue;
        }

        break;
      }


      // Swaps reverting
      let swap;

      while((swap = swaps.pop())) {
        const [swapKey, swapValue] = swap;

        second[swapKey] = swapValue;
      }

      return !nextKey;
    }
  
    return false;
  }

    const hasNaN = Number.isNaN(first) || Number.isNaN(second);
    const hasZero = eqZero ? false : (first === 0 || second === 0);

    if (hasNaN && !eqNaN) {
        return false;
    }

    if ((hasZero && !eqZero) || (hasNaN && eqNaN)) {
        return Object.is(first, second);
    }
    
    if (eqStrict) {
      return first === second;
    }

    return first == second;
  }

export default isEq