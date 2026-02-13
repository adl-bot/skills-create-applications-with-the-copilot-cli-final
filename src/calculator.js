#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   - Addition (+)
 *   - Subtraction (-)
 *   - Multiplication (*)
 *   - Division (/)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   Example: node calculator.js 5 + 3
 */

const [,, ...args] = process.argv;

if (args.length !== 3) {
  console.error('Usage: node calculator.js <number1> <operator> <number2>');
  process.exit(1);

}

const [a, op, b] = args;
const num1 = parseFloat(a);
const num2 = parseFloat(b);

if (isNaN(num1) || isNaN(num2)) {
  console.error('Error: Both operands must be valid numbers.');
  process.exit(1);

}

let result;
switch (op) {
  case '+':
    result = num1 + num2;
    break;
  case '-':
    result = num1 - num2;
    break;
  case '*':
    result = num1 * num2;
    break;
  case '/':
    if (num2 === 0) {
      console.error('Error: Division by zero is not allowed.');
      process.exit(1);

    }
    result = num1 / num2;
    break;
  default:
    console.error('Error: Supported operators are +, -, *, /.');
    process.exit(1);

}

console.log(`Result: ${result}`);
