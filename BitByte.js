const BitHelper = require('./BitHelper.js');

class BitByte {
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
	setBit(offset, bit) {
		BitHelper.checkOffset(offset);
		this.data[offset] = !bit ^ true;
		return this.data;
	}
	getBit(offset) {
		BitHelper.checkOffset(offset);
		return this.data[offset];
	}
	getByte() {
		var byte = 0;
		for (var i = 0; i < this.data.length; i++) {
			byte += this.data[i] && 2 ** (7 - i);
		}
		return byte;
	}
	getChar() {
		return String.fromCharCode(this);
	}
	*[Symbol.iterator]() {
		for (let i = 0; i < 8; i++) {
			yield this.getBit(i);
		}
	}
}

BitByte.prototype.length = 8;

BitByte.prototype.valueOf = function () {
	return this.getByte();
};

BitByte.prototype.toString = function () {
	return this.data.join('');
};

for (let i = 0; i < 8; i++) {
	Object.defineProperty(BitByte.prototype, i, {
		get: function () {
			return this.getBit(i);
		},
		set: function (newBit) {
			return this.setBit(i, newBit);
		},
		enumerable: true,
	});
}

module.exports = BitByte;
