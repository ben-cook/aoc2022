import { Solution } from "../solution";

const solution: Solution<string[]> = {
  parse(input: string) {
    return input.split("\n");
  },

  one(input: string[]) {
    let maxCalories = 0;
    let currentCalories = 0;

    for (const line of input) {
      if (line === "") {
        maxCalories = Math.max(currentCalories, maxCalories);
        currentCalories = 0;
        continue;
      }

      currentCalories += parseInt(line, 10);
    }

    return maxCalories;
  },

  two(input: string[]) {
    const topThree = [0, 0, 0];
    let lowestOfThree = 0;
    let currentCalories = 0;

    for (const line of input) {
      if (line === "") {
        if (currentCalories > lowestOfThree) {
          lowestOfThree = currentCalories;
          topThree.sort((a, b) => a - b);
          topThree[0] = currentCalories;
        }
        currentCalories = 0;
        continue;
      }

      currentCalories += parseInt(line, 10);
    }

    return topThree.reduce((a, b) => a + b);
  },
};

export default solution;
