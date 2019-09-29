module.exports = {
	checkOffset: function (offset) {
		if ('[object Number]' !== Object.prototype.toString.call(offset)) {
			throw new Error('Offset must be a Number');
		}
		if (offset > 7 || offset < 0) {
			throw new Error('Offset must not be greater than 7');
		}
		return true;
	},
	fitBits: function (bitsArray) {
		var fullBitsArray = [
			0, 0, 0, 0, 0, 0, 0, 0,
		];
		for (var i = 7; i > -1; i--) {
			fullBitsArray[i] = !bitsArray[i - (8 - bitsArray.length)] ^ true;
		}
		return fullBitsArray;
	},
	splitByteToBits: function (byte) {
		return this.fitBits(
			byte
				.toString(2)
				.split('')
				.map(bit => +bit)
		);
	},
};
