const
	assert = require('assert'),
	BitByte = require('../BitByte.js');

describe('BitByte', () => {

	describe('constructor', () => {

		it('should accept an array of bits', () => {
			assert.equal(new BitByte(2), 2);
		});

		it('should should accept an unsigned byte integer', () => {
			assert.equal(new BitByte([
				0, 0, 0, 0, 0, 0, 1, 0,
			]), 2);
		});

		it('should ', () => {

		});

	});

	describe('#assign()', () => {

		it('should assign provided array of bits to beginning of local storage of bits', () => {
			let byte = new BitByte([
				0, 1, 0, 0, 0, 0, 0, 0,
			]);

			byte.assign([
				1, 0, 1,
			]);

			assert.equal(byte.getBit(0), 1);
			assert.equal(byte.getBit(1), 0);
			assert.equal(byte.getBit(2), 1);

			byte.assign(
				[
					1, 0, 1,
				],
				1
			);

			assert.equal(byte.getBit(0), 1);
			assert.equal(byte.getBit(1), 1);
			assert.equal(byte.getBit(2), 0);
			assert.equal(byte.getBit(3), 1);
		});

	});

	describe('#getBit()', () => {

		it('should display requested bit', () => {
			let byte = new BitByte([
				0, 1, 0, 0, 0, 0, 0, 0,
			]);

			assert.equal(byte.getBit(0), 0);
			assert.equal(byte.getBit(1), 1);
		});

	});

	describe('#setBit()', () => {

		it('should edit requested bit', () => {
			let byte = new BitByte();

			assert.equal(byte.getBit(0), 0);

			byte.setBit(0, 1);

			assert.equal(byte.getBit(0), 1);
		});
	});

	describe('#getByte()', () => {

		it('should display local storage of bits as an unsigned byte integer', () => {
			assert.equal(new BitByte(65).getByte(), 65);
		});

	});

	describe('#getChar()', () => {

		it('should display local storage of bits as a ASCII character', () => {
			assert.equal(new BitByte(65).getChar(), 'A');
		});

	});

	describe('#toString()', () => {

		it('should display local storage of bits as a sting', () => {
			assert.equal(new BitByte(255).toString(), '11111111');
			assert.equal(new BitByte(2).toString(), '00000010');

			let byte = new BitByte(255);

			byte.setBit(0, 0);
			byte.setBit(1, false);

			assert.equal(byte.toString(), '00111111');
		});

	});

	describe('iterator', () => {

		it('should iterate over the local storage of bits', () => {
			let byte = new BitByte(255),
				iteratedBits = [ ...byte, ],
				pass = true;

			for (let i = 0; i < byte.length; i++) {
				if (byte[i] !== iteratedBits[i]) {
					pass = false;
					break;
				}
			}

			assert.equal(pass, true);
		});

	});

	describe('operator actions', () => {

		it('should work as if it would be a simple number', () => {
			assert.equal(new BitByte(2) ^ 4, 2 ^ 4);
			assert.equal(2 ^ new BitByte(4), 2 ^ 4);
			assert.equal(new BitByte(2) ^ new BitByte(4), 2 ^ 4);
		});

	});

	describe('#safe', () => {

		describe('proxy for BitByte', () => {

			it('should throw an error on out of index get request', () => {
				let byte = new BitByte.safe();

				assert.throws(() => byte.getBit(-1));
				assert.throws(() => byte.getBit(8));
			});

			it('should throw an error on out of index set request', () => {
				let byte = new BitByte.safe();

				assert.throws(() => byte.setBit(-1));
				assert.throws(() => byte.setBit(8));
			});

			// If main tests for get and set doesn't fail, we don't need to test proxy

		});

	});

});
