import { expect, it, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./3";
import { Item } from "./item";

const testInput = readFileSync(
  path.join(import.meta.dir, "sample_input.txt")
).toString();

test("priorities", () => {
  it("a should have priority 1", () => {
    expect(new Item("a").priority).toBe(1);
  });

  it("z should have priority 26", () => {
    expect(new Item("z").priority).toBe(26);
  });

  it("A should have priority 27", () => {
    expect(new Item("A").priority).toBe(27);
  });

  it("Z should have priority 52", () => {
    expect(new Item("Z").priority).toBe(52);
  });
});

// describe("common items should be correct", () => {
//   it("test input should be correct", () => {
//     expect(solution.parse(testInput).map(getCommonItem)).toBe([
//       new Item("p"),
//       new Item("L"),
//       new Item("P"),
//       new Item("v"),
//       new Item("t"),
//       new Item("s"),
//     ]);
//   });
// });

test("part 1 test input", () => {
  expect(solution.one(solution.parse(testInput))).toBe(157);
});

test("part 2 test input", () => {
  expect(solution.two(solution.parse(testInput))).toBe(70);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is correct", () => {
  expect(solution.one(solution.parse(realInput))).toBe(8515);
});

test("part 2 real input is correct", () => {
  expect(solution.two(solution.parse(realInput))).toBe(2434);
});
