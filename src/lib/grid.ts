import "./filterMap";

interface Point {
  readonly x: number;
  readonly y: number;
}

/** Represent a rectangular grid of entries of type T */
export class Grid<T> {
  public inner: T[][];

  constructor(data: T[][]) {
    this.inner = data;
  }

  private offsetToValue(
    { x, y }: Point,
    { x: offsetX, y: offsetY }: Point
  ): T | undefined {
    if (
      this.inner.length > y + offsetY &&
      this.inner[y + offsetY].length > x + offsetX
    ) {
      return this.inner[y + offsetY][x + offsetX];
    }
  }

  public four_neighbours(point: Point): T[] {
    const offsets: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    return offsets.filterMap(([x, y]) => this.offsetToValue(point, { x, y }));
  }

  public eight_neighbours(point: Point): T[] {
    const corner_offsets: [number, number][] = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    return this.four_neighbours(point).concat(
      corner_offsets.filterMap(([x, y]) => this.offsetToValue(point, { x, y }))
    );
  }
}
