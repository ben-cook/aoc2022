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
    // An item is visible if if all of the other items between it and an edge of the grid are lower than it. Only consider items in the same row or column; that is, only look up, down, left, or right from any given item.

    // Create a mask of which items are visible for each direction: left to right, right to left, top to bottom, bottom to top.
    const visbilityMaskLeftToRight: boolean[][] = [];
    const visbilityMaskRightToLeft: boolean[][] = [];
    const visbilityMaskTopToBottom: boolean[][] = [];
    const visbilityMaskBottomToTop: boolean[][] = [];

    // Left to right
    for (let y = 0; y < grid.inner.length; y++) {
      const row: boolean[] = [];
      let max = Number.MIN_SAFE_INTEGER;
      for (let x = 0; x < grid.inner[y].length; x++) {
        row.push(grid.inner[y][x] > max);
        max = Math.max(max, grid.inner[y][x]);
      }
      visbilityMaskLeftToRight.push(row);
    }

    // Right to left
    for (let y = 0; y < grid.inner.length; y++) {
      const row: boolean[] = [];
      let max = Number.MIN_SAFE_INTEGER;
      for (let x = grid.inner[y].length - 1; x >= 0; x--) {
        row.push(grid.inner[y][x] > max);
        max = Math.max(max, grid.inner[y][x]);
      }
      visbilityMaskRightToLeft.push(row.reverse());
    }

    // Top to bottom
    for (let x = 0; x < grid.inner[0].length; x++) {
      const col: boolean[] = [];
      let max = Number.MIN_SAFE_INTEGER;
      for (let y = 0; y < grid.inner.length; y++) {
        col.push(grid.inner[y][x] > max);
        max = Math.max(max, grid.inner[y][x]);
      }
      visbilityMaskTopToBottom.push(col);
    }

    // Bottom to top
    for (let x = 0; x < grid.inner[0].length; x++) {
      const col: boolean[] = [];
      let max = Number.MIN_SAFE_INTEGER;
      for (let y = grid.inner.length - 1; y >= 0; y--) {
        col.push(grid.inner[y][x] > max);
        max = Math.max(max, grid.inner[y][x]);
      }
      visbilityMaskBottomToTop.push(col.reverse());
    }

    // Count the number of visible items for each item in the grid.
    let count = 0;
    for (let y = 0; y < grid.inner.length; y++) {
      for (let x = 0; x < grid.inner[y].length; x++) {
        if (
          visbilityMaskLeftToRight[y][x] ||
          visbilityMaskRightToLeft[y][x] ||
          visbilityMaskTopToBottom[x][y] ||
          visbilityMaskBottomToTop[x][y]
        ) {
          count++;
        }
      }
    }

    return count;
  },

  two(grid: Grid<number>) {
    // To measure the viewing distance from a given item, look up, down, left, and right from that item; stop if you reach an edge or at the first item that is the same height or taller than the item under consideration.

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

    let maxItemValue = Number.MIN_SAFE_INTEGER;
    let maxItemScore = Number.MIN_SAFE_INTEGER;
    for (let y = 0; y < innerGrid.length; y++) {
      for (let x = 0; x < innerGrid[y].length; x++) {
        // Heuristic: Only consider items that are at least 80% of the maximum value in the grid.
        if (innerGrid[y][x] >= maxItemValue * 0.8) {
          maxItemScore = Math.max(maxItemScore, scenicScore(y + 1, x + 1));
        }

        maxItemValue = Math.max(maxItemValue, innerGrid[y][x]);
      }
    }

    return maxItemScore;
  },
};

export default solution;
