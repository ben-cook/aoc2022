declare global {
  interface Array<T> {
    filterMap<R>(f: (input?: T, index?: number) => R | undefined): R[];
  }
}

Object.defineProperty(Array.prototype, "filterMap", {
  value: function <T, R>(f: (input?: T, index?: number) => R | undefined): R[] {
    return this.flatMap((item: T, index: number) => {
      const result = f(item, index);
      return result === undefined ? [] : [result];
    });
  },
});

export {};
