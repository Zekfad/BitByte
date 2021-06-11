/**
 * Try to cast any object into integer.
 * @param {any} object Object to cast into integer.
 * @returns {number|Error} Casted integer or an error instance.
 */
export function castToInt(object: any): number | Error;
/**
 * Check if given offset is acceptable.
 * @param {number} offset Bit offset.
 * @returns {boolean} Returns true if given argument is acceptable.
 */
export function checkOffset(offset: number): boolean;
/**
 * Make array of bits from last 8 elements of an array of number.
 * @param {number[]} bitsArray Array of bits.
 * @returns {number[]} Array of bits.
 */
export function fitBits(bitsArray: number[]): number[];
/**
 * Split unsigned 8-bit integer to array of bits.
 * @param {number} byte Unsigned 8-bit integer.
 * @returns {number[]} Array of bits.
 */
export function splitByteToBits(byte: number): number[];
