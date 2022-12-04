import { readFileSync } from "fs";
import assert from "node:assert";
import test from "node:test";
import path from "path";
import solution from "./4";

const sampleInput = readFileSync(
  path.join(__dirname, "sample_input.txt")
).toString();

test("part 1 sample input", () => {
  assert.strictEqual(solution.one(solution.parse(sampleInput)), 157);
});

// test("part 2 sample input", () => {
//   assert.strictEqual(solution.two(solution.parse(sampleInput)), 70);
// });

// const realInput = readFileSync(path.join(__dirname, "input.txt")).toString();

// test("part 1 real input is correct", () => {
//   assert.strictEqual(solution.one(solution.parse(realInput)), 8515);
// });

// test("part 2 real input is correct", () => {
//   assert.strictEqual(solution.two(solution.parse(realInput)), 2434);
// });
