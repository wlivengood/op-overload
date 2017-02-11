const binaryOpMethods = {
	'==': '__eq__',
	'!=': '__neq__',
	'<': '__lt__',
	'<=': '__le__',
	'>': '__gt__',
	'>=': '__ge__',
	'+': '__add__',
	'-': '__sub__',
	'*': '__mul__',
	'/': '__div__',
	'%': '__mod__',
	'<<': '__lshift__',
	'>>': '__rshift__',
	'>>>': '__urshift__',
	'&': '__and__',
	'|': '__or__',
	'^': '__xor__'
};

const unaryOpMethods = {
	'-': '__neg__',
	'+': '__pos__',
	'~': '__invert__'
};

const nope = new Set(['===', '!==', 'instanceof', 'typeof', 'in', '!', 'void', 'delete']);

function _binaryOperators(operator, left, right) {
	if (!nope.has(operator) && left && left[binaryOpMethods[operator]])
		return left[binaryOpMethods[operator]](right);
	else {
		switch(operator) {
			case '+':
				return left + right;
				break;
			case '-':
				return left - right;
				break;
			case '/':
				return left / right;
				break;
			case '*':
				return left * right;
				break;
			case '==':
				return left == right;
				break;
			case '!=':
				return left != right;
				break;
			case '<':
				return left < right;
				break;
			case '<=':
				return left <= right;
				break;
			case '>':
				return left > right;
				break
			case '>=':
				return left >= right;
				break;
			case '%':
				return left % right;
				break;
			case '<<':
				return left << right;
				break;
			case '>>':
				return left >> right;
				break;
			case '>>>':
				return left >>> right;
				break;
			case '&':
				return left & right;
				break;
			case '|':
				return left | right;
				break;
			case '^':
				return left ^ right;
				break;
		}
	}
}

function _unaryOperators(operator, val) {
	if (!nope.has(operator) && val && val[unaryOpMethods[operator]])
		return val[unaryOpMethods[operator]]();
	else {
		switch (operator) {
			case '+':
				return +val;
				break;
			case '-':
				return -val;
				break;

		}
	}
}

module.exports = {
	_binaryOperators,
	_unaryOperators
};