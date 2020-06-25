module.exports = {
	/**
	 * Check if given offset is acceptable.
	 * @param {number} offset - Bit offset.
	 * @returns {boolean} - Returns true if given argument is acceptable.
	 */
	checkOffset(offset) {
		if ('[object Number]' !== Object.prototype.toString.call(offset))
			throw new Error('Offset must be a Number');

		if (offset < 0 || offset > 7)
			throw new Error('Offset must be in the range of 0 to 7');

		return true;
	},
	/**
	 * Make array of bits from last 8 elements of an array of number.
	 * @param {number[]} bitsArray - Array of bits.
	 * @returns {number[]} - Array of bits.
	 */
	fitBits(bitsArray) {
		let template = new Array(8);

		for (let i = 7; i > -1; i--)
			template[i] = !bitsArray[i - (8 - bitsArray.length)] ^ 1;

		return template;
	},
	/**
	 * Split unsigned 8-bit integer to array of bits.
	 * @param {number} byte - Unsigned 8-bit integer.
	 * @returns {number[]} - Array of bits.
	 */
	splitByteToBits(byte) {
		return this.fitBits(
			byte
				.toString(2)
				.split('')
				.map(bit => +bit)
		);
	},
};
