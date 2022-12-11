import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./10";

const sampleInput = readFileSync(
  path.join(import.meta.dir, "sample_input.txt")
).toString();

test("part 1 sample input is correct", () => {
  expect(solution.one(solution.parse(sampleInput))).toBe(13140);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is correct", () => {
  expect(solution.one(solution.parse(realInput))).toBe(14820);
});
