const { execSync } = require('child_process');

describe('Calculator CLI', () => {
  const runCalc = (a, op, b) => {
    try {
      return execSync(`node src/calculator.js ${a} '${op}' ${b}`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
    } catch (e) {
      return e.stderr ? e.stderr.toString().trim() : '';
    }
  };

  test('adds two numbers', () => {
    expect(runCalc(2, '+', 3)).toBe('Result: 5');
    expect(runCalc(0.5, '+', 1.2)).toBe('Result: 1.7');
  });

  test('subtracts two numbers', () => {
    expect(runCalc(10, '-', 4)).toBe('Result: 6');
    expect(runCalc(5.5, '-', 2.2)).toBe('Result: 3.3');
  });

  test('multiplies two numbers', () => {
    expect(runCalc(45, '*', 2)).toBe('Result: 90');
    expect(runCalc(1.5, '*', 2)).toBe('Result: 3');
  });

  test('divides two numbers', () => {
    expect(runCalc(20, '/', 5)).toBe('Result: 4');
    expect(runCalc(7.5, '/', 2.5)).toBe('Result: 3');
  });

  test('division by zero', () => {
    expect(runCalc(5, '/', 0)).toBe('Error: Division by zero is not allowed.');
  });

  test('invalid operator', () => {
    expect(runCalc(2, '@', 3)).toBe('Error: Supported operators are +, -, *, /, %, ^, sqrt');
  });

  test('invalid operands', () => {
    expect(runCalc('a', '+', 3)).toBe('Error: Both operands must be valid numbers.');
    expect(runCalc(2, '+', 'b')).toBe('Error: Both operands must be valid numbers.');
  });

  test('missing arguments', () => {
    const { stderr } = require('child_process').spawnSync('node', ['src/calculator.js', '2', '+']);
    expect(stderr.toString().trim()).toBe('Usage: node calculator.js <number1> <operator> <number2> OR node calculator.js sqrt <number>');
  });

  test('modulo operation', () => {
    expect(runCalc(5, '%', 2)).toBe('Result: 1');
    expect(runCalc(10, '%', 3)).toBe('Result: 1');
  });

  test('modulo by zero', () => {
    expect(runCalc(5, '%', 0)).toBe('Error: Division by zero is not allowed.');
  });

  test('power operation', () => {
    expect(runCalc(2, '^', 3)).toBe('Result: 8');
    expect(runCalc(4, '^', 0.5)).toBe('Result: 2');
  });

  test('square root operation', () => {
    const runSqrt = n => {
      try {
        return execSync(`node src/calculator.js sqrt ${n}`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
      } catch (e) {
        return e.stderr ? e.stderr.toString().trim() : '';
      }
    };
    expect(runSqrt(16)).toBe('Result: 4');
    expect(runSqrt(2.25)).toBe('Result: 1.5');
  });

  test('square root of negative number', () => {
    const runSqrt = n => {
      try {
        return execSync(`node src/calculator.js sqrt ${n}`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
      } catch (e) {
        return e.stderr ? e.stderr.toString().trim() : '';
      }
    };
    expect(runSqrt(-9)).toBe('Error: Cannot take square root of a negative number.');
  });
});
