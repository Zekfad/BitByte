const
	assert = require('assert'),
	{ ESLint, } = require('eslint'),

	extensions = [
		'.js',
		'.mjs',
		'.cjs',
	],

	eslint = new ESLint({
		extensions,
	});

function formatMessages(messages) {
	const errors = messages
		.map(message =>
			`${message.line}:${message.column} ` +
			`${message.message.slice(0, -1)} - ${message.ruleId}`);

	return `\n${errors.join('\n')}`;
}

function generateTest(lintResult) {
	const { filePath, messages, } = lintResult;

	it(`ESLint validates ${filePath}`, () => {
		if (messages.length > 0) {
			assert.strictEqual(false, true, formatMessages(messages));
		}
	});
}

describe('ESLint', async () => {
	const lintResults = await eslint.lintFiles('.');

	lintResults.forEach(generateTest);
});
