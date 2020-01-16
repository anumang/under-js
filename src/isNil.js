import 'core-js';

/**
 * Checks the value is null or undefined
 *
 * @since 0.1.0
 * @param {Object} object Target value
 * @returns {*} Check null or undefined
 * @example
 *
 * isNil(undefined)
 * > true
 *
 * isNil(null)
 * > true
 * 
 * isNil('')
 * > false
 *
 */
const isNil = (value) => value == null;

export default isNil;
