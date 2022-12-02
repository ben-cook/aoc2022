import assert from "node:assert";
import test from "node:test";
import solution from "./3";
import { Item } from "./item";
import { Rucksack } from "./rucksack";

const testInput =
  "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw";

test("priorities", () => {
  assert.strictEqual(new Item("a").priority, 1);
  assert.strictEqual(new Item("z").priority, 26);
  assert.strictEqual(new Item("A").priority, 27);
  assert.strictEqual(new Item("Z").priority, 52);
});

test("common items", () => {
  assert.deepEqual(
    solution
      .parse(testInput)
      .map((line) => new Rucksack(line))
      .map((rucksack) => rucksack.commonItem),
    [
      new Item("p"),
      new Item("L"),
      new Item("P"),
      new Item("v"),
      new Item("t"),
      new Item("s"),
    ]
  );
});

test("part 1", () => {
  assert.strictEqual(solution.one(solution.parse(testInput)), 157);
});

test("part 2", () => {
  assert.strictEqual(solution.two(solution.parse(testInput)), 70);
});
