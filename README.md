# highlight-error

This is a small utility that helps you format error positions in code.

### Installation

```bash
npm install --save highlight-error
```

### Usage

```js
const highlightError = require('highlight-error');

const code = `function a() {
  return a + *;
}`;

console.log(highlightError(code, {
  line: 2,
  column: 13
}));
```

This will print:

<pre><span style="color: blue;">  1</span> | function a() {<br/><span style="color: blue;"><span style="color: red;">></span> 2</span> |   return a + *;<br/>                   <span style="color: red;">^</span><br/><span style="color: blue;">  3</span> | }</pre>

If you want the output without colors just add the option:

```js
console.log(highlightError(code, {
  line: 2,
  column: 13
}, { colors: false }));
```

This will print:

```
  1 | function a() {
> 2 |   return a + *;
                   ^
  3 | }
```

### API

##### highlightError

```
highlightError(
  code: string,
  pos: Location | number,
  options?: Options
): string
```

The first argument is the code you want to highlight the error in.

The second argument is the error position. Can be a number (meaning
the position from the start of the code) or a `{ line, column }` object
with 1-indexed line.

The third argument is options:

* `options.neighborLinesCount` (default: `2`): how many lines above
and below the selected line should be printed.
* `options.colors` (default: `true`): whether to use colors for the
output or not.
