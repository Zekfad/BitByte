const
	assert = require('assert'),
	BitHelper = require('../BitHelper.js');

describe('BitHelper', () => {

	describe('#checkOffset()', function () {

		it('should check if given offset is acceptable', () => {
			assert.equal(BitHelper.checkOffset(0), true);
			assert.throws(() => BitHelper.checkOffset(-1));
			assert.throws(() => BitHelper.checkOffset(8));
		});

	});

	describe('#fitBits()', function () {

		it('should fit array of bits to 8 elements array', () => {
			assert.deepEqual(
				BitHelper.fitBits([ 1, 0, ]),
				[
					0, 0, 0, 0, 0, 0, 1, 0,
				]
			);
		});

	});

	describe('#splitByteToBits()', function () {

		it('should split unsigned byte integer to array of bits', () => {
			assert.deepEqual(
				BitHelper.splitByteToBits(2),
				[
					0, 0, 0, 0, 0, 0, 1, 0,
				]
			);
		});

	});

});
