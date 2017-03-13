# babel-plugin-op-overload
##### A babel plugin for Python-style operator overloading in JS
This plugin is designed for use with the [op-overload babel plugin](https://github.com/wlivengood/babel-plugin-op-overload).
The plugin allows babel to replace all calls to binary or unary operators with calls to a function
exposed by the op-overload package, which looks on the operands for the appropriate "magic method"
and, if it exists, calls it
### Example:
```
npm install babel-plugin-op-overload
npm install op-overload

// build.js
const fs = require('fs');
const babel = require('babel-core');
const opOverload = require('babel-plugin-op-overload');

const fileName = process.argv[2];

fs.readFile(fileName, (err, data) => {
	if (err) console.log(err);

	const src = data.toString();

	const output = babel.transform(src, {
		plugins: [opOverload]
	});

	fs.writeFile("compiled.js", output.code, (err) => console.log(err));
});

// src.js
const {_binaryOperators, _unaryOperators} = require('op-overload');

class Num {
	constructor(val) {
		this.val = val;
	}

	__add__(other) {
		return new Num(this.val + other.val);
	}

	__neg__() {
		return new Num(-this.val);
	}
}

let three = new Num(3);
let four = new Num(4);
let seven = three + four;

console.log(seven.val);

// compiled.js
const { _binaryOperators, _unaryOperators } = require('op-overload');

class Num {
	constructor(val) {
		this.val = val;
	}

	__add__(other) {
		return new Num(_binaryOperators('+', this.val, other.val));
	}

	__neg__() {
		return new Num(_unaryOperators('-', this.val));
	}
}

let three = new Num(3);
let four = new Num(4);
let seven = _binaryOperators('+', three, four);

console.log(seven.val);
```