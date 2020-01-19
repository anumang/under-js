import 'core-js';

/**
 * Check given Number|String input as integer
 *
 * @since 0.1.0
 * @param {Number|string} n Expected number
 * @returns {Boolean} Integer result
 * @example
 *
 * isInteger('1')
 * > true
 * 
 * isInteger(1.2)
 * > false
 *
 * isInteger(true)
 * > false
 *
 */
const isInteger = (n) => typeof n !== 'object' && typeof n !== 'boolean' && Number.isInteger(Number(n));

export default isInteger;