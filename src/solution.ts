export interface Solution<T> {
  parse: (input: string) => T;
  one: (input: T) => number;
  two: (input: T) => number;
}
