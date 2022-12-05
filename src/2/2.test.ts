import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution, { Choice, scoreRound } from "./2";

test("score round is correct", () => {
  expect(scoreRound({ opponent: Choice.Rock, you: Choice.Paper })).toBe(8);
  expect(scoreRound({ opponent: Choice.Paper, you: Choice.Rock })).toBe(1);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 answer for real input is 13565", () => {
  expect(solution.one(solution.parse(realInput))).toBe(13565);
});

test("part 2 answer for real input is 12424", () => {
  expect(solution.two(solution.parse(realInput))).toBe(12424);
});
