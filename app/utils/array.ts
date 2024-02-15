export const range = (start: number, end: number): Array<number> =>
  Array(end - start + 1)
    .fill(start)
    .map((value, index) => value + index);

export const between = (
  min: number,
  max: number,
  array: Array<number>
): Array<number> => array.map((value) => Math.min(Math.max(min, value), max));

export const uniqBy = (array: Array<any>, iteratee: (value: any) => any) =>
  array.filter(
    (value, index, self) =>
      index === self.findIndex((other) => iteratee(other) === iteratee(value))
  );
