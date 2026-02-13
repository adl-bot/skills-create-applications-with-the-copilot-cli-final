#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   - Addition (+)
 *   - Subtraction (-)
 *   - Multiplication (*)
 *   - Division (/)
 *   - Modulo (%)
 *   - Power (^)
 *   - Square Root (sqrt)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   node calculator.js <operator> <number>
 *   Example: node calculator.js 5 + 3
 *   Example: node calculator.js sqrt 9
 */

const [,, ...args] = process.argv;

if (args.length === 2 && args[0].toLowerCase() === 'sqrt') {
  const n = parseFloat(args[1]);
  if (isNaN(n)) {
    console.error('Error: Operand must be a valid number.');
    process.exit(1);
  }
  if (n < 0) {
    console.error('Error: Cannot take square root of a negative number.');
    process.exit(1);
  }
  console.log(`Result: ${Math.sqrt(n)}`);
  process.exit(0);
}

if (args.length !== 3) {
  console.error('Usage: node calculator.js <number1> <operator> <number2> OR node calculator.js sqrt <number>');
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
  case '%':
    if (num2 === 0) {
      console.error('Error: Division by zero is not allowed.');
      process.exit(1);
    }
    result = num1 % num2;
    break;
  case '^':
    result = Math.pow(num1, num2);
    break;
  default:
    console.error('Error: Supported operators are +, -, *, /, %, ^, sqrt');
    process.exit(1);
}

console.log(`Result: ${result}`);
