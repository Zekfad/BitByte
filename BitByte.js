function checkOffset(offset) {
	if ('[object Number]' !== Object.prototype.toString.call(offset)) {
		throw new Error('Offset must be a Number');
	}
	if (offset > 7) {
		throw new Error('Offset must not be greater than 7');
	}
	return true;
}

function fitBits(bitsArray) {
	var fullBitsArray = [
		0, 0, 0, 0, 0, 0, 0, 0,
	];
	for (var i = 7; i > -1; i--) {
		fullBitsArray[i] = !bitsArray[i - (8 - bitsArray.length)] ^ true;
	}
	return fullBitsArray;
}

function splitByteToBits(byte) {
	return fitBits(
		byte
			.toString(2)
			.split('')
			.map(bit => +bit)
	);
}

class BitByte {
	constructor(initialData = [
		0, 0, 0, 0, 0, 0, 0, 0,
	]) {
		if ('[object Number]' === Object.prototype.toString.call(initialData)) {
			if (initialData < 0 || initialData > 255)
				throw new Error("Byte's byte Number must be in range of [0;255].");
			this.data = splitByteToBits(initialData);
		} else if (
			'[object Array]' === Object.prototype.toString.call(initialData)
		) {
			if (initialData.length > 8)
				throw new Error("Byte's bits Array length must not exceed of 8");
			this.data = fitBits(
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
		checkOffset(offset);
		this.data[offset] = !bit ^ true;
		return this.data;
	}
	getBit(offset) {
		checkOffset(offset);
		return this.data[offset];
	}
	getByte() {
		var byte = 0;
		for (var i = 0; i < this.data.length; i++) {
			byte += this.data[i] && 2 ** (7 - i);
		}
		return byte;
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
