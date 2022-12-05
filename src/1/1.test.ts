import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./1";

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 answer for real input is 69206", () => {
  expect(solution.one(solution.parse(realInput))).toBe(69206);
});

test("part 2 answer for real input is 197400", () => {
  expect(solution.two(solution.parse(realInput))).toBe(197400);
});
