interface Options {
  neighborLinesCount?: number;
  colors?: boolean;
}

interface Location {
  line: number;
  column: number;
}

export = function(
  code: string,
  pos: Location | number,
  options?: Options
): string;
