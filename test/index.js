const { strictEqual } = require('assert');
const chalk = require('chalk');
const highlightError = require('../src');

describe('highlight-error', () => {
  it('should highlight error', () => {
    strictEqual(
      highlightError(`function a() {
  return a + *;
}`, { line: 2, column: 13 }),
      `  ${ chalk.blue('1') } | function a() {
${ chalk.red('>') } ${ chalk.blue('2') } |   return a + *;
                   ${ chalk.red('^') }
  ${ chalk.blue('3') } | }`
    );
  });

  it('should not use colors if not needed', () => {
    strictEqual(
      highlightError(`function a() {
  return a + *;
}`, { line: 2, column: 13 }, { colors: false }),
      `  1 | function a() {
> 2 |   return a + *;
                   ^
  3 | }`
    );
  });

  it('should use number position if specified', () => {
    strictEqual(
      highlightError(`function a() {
  return a + *;
}`, 28, { colors: false }),
      `  1 | function a() {
> 2 |   return a + *;
                   ^
  3 | }`
    );
  });

  it('should respect the neighborLinesCount options', () => {
    strictEqual(
      highlightError(`function c() {
  return 42;
}

function a() {
  return a + *;
}`, { line: 6, column: 13 }, { colors: false, neighborLinesCount: 4 }),
      `  2 |   return 42;
  3 | }
  4 | 
  5 | function a() {
> 6 |   return a + *;
                   ^
  7 | }`
    );
  });
});
