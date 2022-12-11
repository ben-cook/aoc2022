import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./8";

const sampleInput = readFileSync(
  path.join(import.meta.dir, "sample_input.txt")
).toString();

test("part 1 sample input is correct", () => {
  expect(solution.one(solution.parse(sampleInput))).toBe(21);
});

test("part 2 sample input is correct", () => {
  expect(solution.two(solution.parse(sampleInput))).toBe(8);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is correct", () => {
  expect(solution.one(solution.parse(realInput))).toBe(1789);
});

test("part 2 real input is correct", () => {
  expect(solution.two(solution.parse(realInput))).toBe(314820);
});
