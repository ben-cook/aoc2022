import { array_chunk } from "../lib/chunkIterator";
import { Solution } from "../solution";
import { Item } from "./item";

export const getCommonItem = (items: string): Item | undefined => {
  let commonItem;
  const seen = new Set();

  for (const character of items.slice(0, items.length / 2)) {
    seen.add(character);
  }

  for (const character of items.slice(items.length / 2)) {
    if (seen.has(character)) {
      commonItem = new Item(character);
      break;
    }
  }

  return commonItem;
};

const solution: Solution<string[]> = {
  parse(input: string) {
    return input.split("\n").filter((line) => line !== "");
  },

  one(input: string[]) {
    return input
      .flatMap((items) => {
        const commonItem = getCommonItem(items);
        return commonItem ? [commonItem] : [];
      })
      .reduce((acc, cur) => acc + cur.priority, 0);
  },

  two(input: string[]) {
    return Array.from(array_chunk(input, 3, false))
      .map((triple) => {
        const [one, two, three] = triple;

        const commonItem = new Item(
          [...one.split("")]
            .filter((char) => two.includes(char))
            .filter((char) => three.includes(char))[0]
        );
        return commonItem.priority;
      })
      .reduce((a, b) => a + b);
  },
};

export default solution;
