import { array_chunk } from "../lib/chunkIterator";
import { Solution } from "../solution";
import { Group } from "./group";
import { Rucksack } from "./rucksack";

const solution: Solution<string[]> = {
  parse(input: string) {
    return input.split("\n").filter((line) => line !== "");
  },

  one(input: string[]) {
    return input
      .map((line) => new Rucksack(line))
      .reduce((acc, cur) => acc + (cur.commonItem?.priority ?? 0), 0);
  },

  two(input: string[]) {
    return Array.from(array_chunk(input, 3, false))
      .map((triple) => {
        const group = new Group(triple);
        return group.commonItem.priority;
      })
      .reduce((a, b) => a + b);
  },
};

export default solution;
