const BitHelper = require('./BitHelper.js');

/** Class representing a byte. */
class BitByte {
	/**
	 * Create a byte.
	 * @param {number|number[]|boolean[]} initialData - Unsigned byte integer or bits array.
	 */
	constructor(initialData = [
		0, 0, 0, 0, 0, 0, 0, 0,
	]) {
		if ('[object Number]' === Object.prototype.toString.call(initialData)) {
			if (initialData < 0 || initialData > 255)
				throw new Error("Byte's byte Number must be in range of [0;255].");
			this.data = BitHelper.splitByteToBits(initialData);
		} else if (
			'[object Array]' === Object.prototype.toString.call(initialData)
		) {
			if (initialData.length > 8)
				throw new Error("Byte's bits Array length must not exceed of 8");
			this.data = BitHelper.fitBits(
				initialData.map(bit => {
					let newBit = +bit;
					if (isNaN(newBit))
						throw new Error('One of bits you provided is invalid.');
					return newBit;
				})
			);
		} else throw new Error('Byte must be an bits Array or byte Number');
	}
	/**
	 * Change bit on a given offset.
	 * @param {number} offset - Bit offset.
	 * @param {number|boolean} bit - Bit.
	 * @returns {number} - Bit.
	 */
	setBit(offset, bit) {
		BitHelper.checkOffset(offset);
		this.data[offset] = !bit ^ true;
		return this.data;
	}
	/**
	 * Get bit on a given offset.
	 * @param {number} offset - Bit offset.
	 * @returns {number} - Bit.
	 */
	getBit(offset) {
		BitHelper.checkOffset(offset);
		return this.data[offset];
	}
	/**
	 * Get local storage of bits as an unsigned byte integer.
	 * @returns {number} - Unsigned byte integer.
	 */
	getByte() {
		var byte = 0;
		for (var i = 0; i < this.data.length; i++) {
			byte += this.data[i] && 2 ** (7 - i);
		}
		return byte;
	}
	/**
	 * Get local storage of bits as ASCII character.
	 * @returns {string} - ASCII character.
	 */
	getChar() {
		return String.fromCharCode(this);
	}
	/**
	 * Get local storage of bits as string.
	 * @returns {string} - String representation of local storage of bits.
	 */
	toString() {
		return this.data.join('');
	}
	/**
	 * Get local storage of bits an unsigned byte integer.
	 * @returns {string} - Unsigned byte integer.
	 */
	valueOf() {
		return this.getByte();
	}
	/**
	 * Assign array of bits to an instance.
	 * @param {number[]|boolean[]} bits - Bits array.
	 * @param {number} - Assign offset.
	 * @returns {boolean} - Returns true if no errors found.
	 */
	assign(bits, offset = 0) {
		if ('[object Array]' !== Object.prototype.toString.call(bits))
			throw new Error('Bits must be an array');
		if ('[object Number]' !== Object.prototype.toString.call(offset))
			throw new Error('Offset must be a number');
		bits.forEach((bit, index) => this.setBit(offset + index, bit));
		return true;
	}
	/**
	 * Generate bits sequence.
	 * @yields {number} - Next number in the sequence.
	 */
	*[Symbol.iterator]() {
		for (let i = 0; i < 8; i++) {
			yield this.getBit(i);
		}
	}
}

/**
 * Get class representing an array of bits with index assign checks.
 * @returns {BitByteArray}
 */
BitByte.safe = function (...args) {
	return new Proxy(new BitByte(...args), {
		get: function (obj, prop) {
			if ('[object Symbol]' !== Object.prototype.toString.call(prop) && !isNaN(+prop))
				BitHelper.checkOffset(+prop);
			return obj[prop];
		},
		set: function (obj, prop, value) {
			if ('[object Symbol]' !== Object.prototype.toString.call(prop) && !isNaN(+prop))
				BitHelper.checkOffset(+prop);
			return obj[prop] = value;
		},
	});
};

for (let i = 0; i < 8; i++) {
	Object.defineProperty(BitByte.prototype, i, {
		get: function () {
			return this.getBit(i);
		},
		set: function (newBit) {
			this.setBit(i, newBit);
		},
		enumerable: true,
	});
}

module.exports = BitByte;
