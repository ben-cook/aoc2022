import { readFileSync } from "fs";
import assert from "node:assert";
import test from "node:test";
import path from "path";
import solution from "./1";

const realInput = readFileSync(path.join(__dirname, "input.txt")).toString();

test("part 1 real input is correct", () => {
  assert.strictEqual(solution.one(solution.parse(realInput)), 69206);
});

test("part 2 real input is correct", () => {
  assert.strictEqual(solution.two(solution.parse(realInput)), 197400);
});
