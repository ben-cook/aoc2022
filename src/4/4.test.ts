import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./4";

const sampleInput = readFileSync(
  path.join(__dirname, "sample_input.txt")
).toString();

test("part 1 sample input", () => {
  expect(solution.one(solution.parse(sampleInput))).toBe(2);
});

test("part 2 sample input", () => {
  expect(solution.two(solution.parse(sampleInput))).toBe(4);
});

const realInput = readFileSync(path.join(__dirname, "input.txt")).toString();

test("part 1 real input is correct", () => {
  expect(solution.one(solution.parse(realInput))).toBe(507);
});

test("part 2 real input is correct", () => {
  expect(solution.two(solution.parse(realInput))).toBe(897);
});
