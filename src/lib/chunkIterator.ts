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

export function* array_chunk<T>(
  iterable: T[],
  batchSize: number,
  keepTrailing = true
) {
  let items: T[] = [];
  for (const item of iterable) {
    items.push(item);
    if (items.length >= batchSize) {
      yield items;
      items = [];
    }
  }
  if (keepTrailing && items.length !== 0) {
    yield items;
  }
}
