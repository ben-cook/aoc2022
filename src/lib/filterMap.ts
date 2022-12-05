declare global {
  interface Array<T> {
    filterMap<R>(f: (input: T) => R | undefined): R[];
  }
}

Object.defineProperty(Array.prototype, "filterMap", {
  value: function <T, R>(f: (input: T) => R | undefined): R[] {
    return this.flatMap((item: T) => {
      const result = f(item);
      return result === undefined ? [] : [result];
    });
  },
});

export {};
