import { Solution } from "../solution";

const solution: Solution<string[]> = {
  parse(input: string) {
    return input.split("\n");
  },

  one(input: string[]) {
    return 0;
  },

  two(input: string[]) {
    return 0;
  },
};

export default solution;
