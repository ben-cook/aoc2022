export interface Solution<T> {
  parse: (input: string) => T;
  one: (input: T) => number | string;
  two: (input: T) => number | string;
}
