const
	assert = require('assert'),
	BitHelper = require('../BitHelper.js');

describe('BitHelper', () => {

	describe('#castToInt()', function () {

		it('should cast any object into integer or return an error', () => {
			assert.equal(BitHelper.castToInt(null), 0);
			assert.equal(BitHelper.castToInt('0'), 0);
			assert.equal(BitHelper.castToInt('Error') instanceof Error, true);
		});

	});

	describe('#checkOffset()', function () {

		it('should check if given offset is acceptable', () => {
			assert.equal(BitHelper.checkOffset(0), true);
			assert.throws(() => BitHelper.checkOffset(-1));
			assert.throws(() => BitHelper.checkOffset(8));
			assert.throws(() => BitHelper.checkOffset(''));
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
