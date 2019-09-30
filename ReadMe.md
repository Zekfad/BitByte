# BitByte

[![npm version](https://img.shields.io/npm/v/@zekfad/bitbyte?style=for-the-badge)](https://www.npmjs.com/package/@zekfad/bitbyte)![node version](https://img.shields.io/node/v/@zekfad/bitbyte?style=for-the-badge)

Flexible byte representation for JavaScript.

## Install

Install via npm:

```
npm install --save @zekfad/bitbyte
```

## Usage

### Example

```js
const BitByte = require('@zekfad/bitbyte');

const myByte = new BitByte(200);

console.log(myByte.toString()); // 11001000
console.log([...myByte]); // [ 1, 1, 0, 0, 1, 0, 0, 0 ]
console.log(myByte[1], myByte[2]); // 1 0

myByte[1] = 0;
myByte[2] = 1;

console.log(myByte.toString()); // 10101000
console.log(0 + myByte); // 168
```

### Create byte

#### From unsigned byte integer

```js
const myByte = new BitByte(200);

console.log(myByte.toString()); // 11001000
```

#### From bits array

```js
const myByte = new BitByte([ 1, 1, 0, 0, 1, 0, 0, 0]);

console.log(myByte.toString()); // 11001000
```

You can also pass in Booleans:

```js
const myByte = new BitByte([ true, true, false, false, true, false, false, false]);

console.log(myByte.toString()); // 11001000
```

### Iterator
```js
const myByte = new BitByte(200);

console.log([...myByte]); // [ 1, 1, 0, 0, 1, 0, 0, 0 ]
```

### Array-like access
```js
const myByte = new BitByte(200);

// get
console.log(myByte[1], myByte[2]); // 1 0

// set
myByte[1] = 0;
myByte[2] = 1;
```

### Treat as a number

```js
const myByte = new BitByte(200);

console.log(myByte == 200); // true
console.log(myByte + 0); // 200
console.log(new Number(myByte)); // [Number: 200]
```

### String with bits

```js
const myByte = new BitByte(200);

console.log(new String(myByte)); // [String: '11001000']
console.log(myByte.toString()); // '11001000'
```

### Methods

For those who want to use function calls.

#### `assign(bits, offset)`

Assigns array of bits to an instance.

#### `getBit(offset)`

Returns a bit from requested offset in range from 0 to 7.

#### `setBit(offset, bit)`

Sets a bit on requested offset in range from 0 to 7.

`bit` must be `Number` (`0` or `1`) or `Boolean`.

#### `getByte()`

Returns byte as an unsigned byte integer.

#### `getChar()`

Returns character from a byte.
