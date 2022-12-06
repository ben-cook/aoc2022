import { Solution } from "../solution";

const solve = (input: string, max: number) => {
  let lo = 0;
  let hi = 0;
  const charCounts = new Map<string, number>();

  while (hi < input.length) {
    // base case: we have a window of size max with all unique characters
    if (
      charCounts.size === max &&
      Array.from(charCounts.values()).every((count) => count === 1)
    ) {
      return hi;
    }

    // increment the count of the item at the hi index
    charCounts.set(input[hi], (charCounts.get(input[hi]) ?? 0) + 1);

    if (hi - lo >= max) {
      // decrement the count of the item at the lo index
      if (charCounts.get(input[lo]) === 1) {
        charCounts.delete(input[lo]);
      } else {
        charCounts.set(input[lo], (charCounts.get(input[lo]) ?? 1) - 1);
      }
      // increment lo to maintain the window size
      lo++;
    }

    // increment hi to expand the window
    hi++;
  }

  throw Error("No solution found");
};

const solution: Solution<string> = {
  parse(input: string) {
    return input.trim();
  },

  one(input: string) {
    return solve(input, 4);
  },

  two(input: string) {
    return solve(input, 14);
  },
};

export default solution;
