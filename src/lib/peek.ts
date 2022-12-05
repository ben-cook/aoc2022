declare global {
  interface Array<T> {
    peek(): T | undefined;
  }
}

Object.defineProperty(Array.prototype, "peek", {
  value: function <T>(): T | undefined {
    return this.at(-1);
  },
});

export {};
