import { readFileSync } from "fs";
import assert from "node:assert";
import test, { describe, it } from "node:test";
import path from "path";
import solution, { getCommonItem } from "./3";
import { Item } from "./item";

const testInput =
  "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw";

describe("priorities", () => {
  it("a should have priority 1", () => {
    assert.strictEqual(new Item("a").priority, 1);
  });

  it("z should have priority 26", () => {
    assert.strictEqual(new Item("z").priority, 26);
  });

  it("A should have priority 27", () => {
    assert.strictEqual(new Item("A").priority, 27);
  });

  it("Z should have priority 52", () => {
    assert.strictEqual(new Item("Z").priority, 52);
  });
});

describe("common items should be correct", () => {
  it("test input should be correct", () => {
    assert.deepEqual(solution.parse(testInput).map(getCommonItem), [
      new Item("p"),
      new Item("L"),
      new Item("P"),
      new Item("v"),
      new Item("t"),
      new Item("s"),
    ]);
  });
});

test("part 1 test input", () => {
  assert.strictEqual(solution.one(solution.parse(testInput)), 157);
});

test("part 2 test input", () => {
  assert.strictEqual(solution.two(solution.parse(testInput)), 70);
});

const realInput = readFileSync(path.join(__dirname, "input.txt")).toString();

test("part 1 real input is correct", () => {
  assert.strictEqual(solution.one(solution.parse(realInput)), 8515);
});

test("part 2 real input is correct", () => {
  assert.strictEqual(solution.two(solution.parse(realInput)), 2434);
});
