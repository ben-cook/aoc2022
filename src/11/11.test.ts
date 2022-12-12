import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./11";

const sampleInput = readFileSync(
  path.join(import.meta.dir, "sample_input.txt")
).toString();

test("part 1 sample input is correct", () => {
  expect(solution.one(solution.parse(sampleInput))).toBe(10605);
});

test("part 2 sample input is correct", () => {
  expect(solution.two(solution.parse(sampleInput))).toBe(2713310158);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is correct", () => {
  expect(solution.one(solution.parse(realInput))).toBe(61005);
});

test("part 2 real input is correct", () => {
  expect(solution.two(solution.parse(realInput))).toBe(20567144694);
});
