export function* chunk<T>(iterable: IterableIterator<T>, batchSize: number) {
  let items: T[] = [];
  for (const item of iterable) {
    items.push(item);
    if (items.length >= batchSize) {
      yield items;
      items = [];
    }
  }
  if (items.length !== 0) {
    yield items;
  }
}

declare global {
  interface Array<T> {
    chunk(chunkSize: number, keepTrailing: boolean): IterableIterator<T>;
  }
}

Object.defineProperty(Array.prototype, "chunk", {
  value: function* <T>(
    chunkSize: number,
    keepTrailing = true
  ): IterableIterator<T[]> {
    let items: T[] = [];
    for (const item of this) {
      items.push(item);
      if (items.length >= chunkSize) {
        yield items;
        items = [];
      }
    }
    if (keepTrailing && items.length !== 0) {
      yield items;
    }
  },
});
