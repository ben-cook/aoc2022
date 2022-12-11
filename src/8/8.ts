import { Grid } from "../lib/grid";
import { Solution } from "../solution";

const solution: Solution<Grid<number>> = {
  parse(input: string) {
    return new Grid(
      input
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split("").map((char) => parseInt(char, 10)))
    );
  },

  one(grid: Grid<number>) {
    const visibleInArray = (array: number[], index: number): boolean => {
      let max = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i < array.length; i++) {
        if (i === index) {
          return array[index] > max;
        }
        max = Math.max(max, array[i]);
      }
      throw new Error("Should not reach here");
    };

    const isVisible = (rowIndex: number, colIndex: number) => {
      const row = grid.row(rowIndex);
      const col = grid.col(colIndex);
      return (
        visibleInArray(row, colIndex) ||
        visibleInArray([...row].reverse(), row.length - 1 - colIndex) ||
        visibleInArray(col, rowIndex) ||
        visibleInArray([...col].reverse(), col.length - 1 - rowIndex)
      );
    };

    // The outermost rows and columns are always visible
    // Calculate the length of the visible outer rows and columns
    const visibleOuterRows = grid.inner[0].length * 2;
    const visibleOuterColumns = grid.inner.length * 2;
    const visibleInOuterSides = visibleOuterColumns + visibleOuterRows - 4;

    const innerGrid = grid.inner
      .slice(1, grid.inner.length - 1)
      .map((row) => row.slice(1, row.length - 1));

    const visibleInnerTiles = innerGrid.flatMap((row, rowIndex) =>
      row.filter((_, colIndex) => isVisible(rowIndex + 1, colIndex + 1))
    ).length;

    return visibleInOuterSides + visibleInnerTiles;
  },

  two(grid: Grid<number>) {
    const viewingDistance = (array: number[], value: number): number => {
      if (array.length <= 1) {
        return 1;
      }
      let max = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i < array.length; i++) {
        max = Math.max(max, array[i]);
        if (max >= value) {
          return i + 1;
        }
      }
      return array.length;
    };
    const scenicScore = (rowIndex: number, colIndex: number) => {
      const left = viewingDistance(
        [...grid.row(rowIndex).slice(0, colIndex)].reverse(),
        grid.inner[rowIndex][colIndex]
      );
      const right = viewingDistance(
        grid.row(rowIndex).slice(colIndex + 1),
        grid.inner[rowIndex][colIndex]
      );
      const up = viewingDistance(
        [...grid.col(colIndex).slice(0, rowIndex)].reverse(),
        grid.inner[rowIndex][colIndex]
      );
      const down = viewingDistance(
        grid.col(colIndex).slice(rowIndex + 1),
        grid.inner[rowIndex][colIndex]
      );

      return left * right * up * down;
    };

    const innerGrid = grid.inner
      .slice(1, grid.inner.length - 1)
      .map((row) => row.slice(1, row.length - 1));

    return Math.max(
      ...innerGrid.flatMap((row, rowIndex) =>
        row.map((_, colIndex) => {
          const score = scenicScore(rowIndex + 1, colIndex + 1);
          return score;
        })
      )
    );
  },
};

export default solution;
