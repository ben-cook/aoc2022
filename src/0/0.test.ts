import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./0";

const sampleInput = readFileSync(
  path.join(import.meta.dir, "sample_input.txt")
).toString();

test("part 1 sample input is CMZ", () => {
  expect(solution.one(solution.parse(sampleInput))).toBe("CMZ");
});

test("part 2 sample input is MCD", () => {
  expect(solution.two(solution.parse(sampleInput))).toBe("MCD");
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is TWSGQHNHL", () => {
  expect(solution.one(solution.parse(realInput))).toBe("TWSGQHNHL");
});

test("part 2 real input is JNRSCDWPP", () => {
  expect(solution.two(solution.parse(realInput))).toBe("JNRSCDWPP");
});
