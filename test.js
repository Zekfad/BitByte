const BitByte = require('./BitByte.js');

if (process.env.test_operators) {
	console.log(
		`Operators test: ${
			(2 ^ 2) === (new BitByte(2) ^ new BitByte(2)) ? 'OK' : 'FAIL'
		}`
	);
}

if (process.env.test_bits) {
	console.log(
		`Bits test 1: ${
			'11111111' === new BitByte(255).toString() &&
			'00000010' === new BitByte(2).toString()
				? 'OK'
				: 'FAIL'
		}`
	);
	(() => {
		let byte = new BitByte(255);
		byte[0] = 0;
		byte[1] = false;
		console.log(
			`Bits test 2: ${'00111111' === byte.toString() ? 'OK' : 'FAIL'}`
		);
	})();
}

if (process.env.test_iterator) {
	let byte = new BitByte(255),
		iteratedBits = [ ...byte, ],
		pass = true;
	for (var i = 0; i < byte.length; i++) {
		if (byte[i] !== iteratedBits[i]) {
			pass = false;
			break;
		}
	}
	console.log(`Iterator test: ${pass ? 'OK' : 'FAIL'}`);
}

if (process.env.test_char) {
	console.log(
		`Character test: ${'A' === new BitByte(65).getChar() ? 'OK' : 'FAIL'}`
	);
}
