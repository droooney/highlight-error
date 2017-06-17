const _ = require('lodash');
const chalk = require('chalk');
const { default: LinesAndColumns } = require('lines-and-columns');

module.exports = (code, pos, options) => {
  const linesCount = _.get(options, 'neighborLinesCount', 2);
  const colors = !!_.get(options, 'colors', true);
  const leftBrace = colors
    ? chalk.red('>')
    : '>';
  const bottomBrace = colors
    ? chalk.red('^')
    : '^';

  if (typeof pos === 'number') {
    const lines = new LinesAndColumns(code);

    pos = lines.locationForIndex(pos);
  } else {
    pos.line--;
  }

  const {
    line,
    column
  } = pos;
  const lines = code.split(/\r\n|\r|\n/);
  const lineNumberWidth = lines.length.toString().length;
  const startLine = Math.max(0, pos.line - linesCount);
  const beforeLines = lines.slice(startLine, pos.line);
  const afterLines = lines.slice(pos.line + 1, pos.line + linesCount + 1);

  return addLineNumbers(beforeLines, startLine + 1, ' ')
    .concat(addLineNumbers([lines[line]], pos.line + 1, leftBrace))
    .concat(' '.repeat(lineNumberWidth + 5 + column) + bottomBrace)
    .concat(addLineNumbers(afterLines, pos.line + 2, ' '))
    .join('\n');

  function addLineNumbers(lines, startLine, startCharacter) {
    return lines.map((line, index) => {
      const lineNumber = _.padStart(startLine + index, lineNumberWidth);

      return `${ startCharacter } ${ colors ? chalk.blue(lineNumber) : lineNumber } | ${ line }`;
    });
  }
};
