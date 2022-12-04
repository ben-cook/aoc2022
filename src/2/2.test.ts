import { readFileSync } from "fs";
import assert from "node:assert";
import test from "node:test";
import path from "path";
import solution, { Choice, scoreRound } from "./2";

test("score round is correct", () => {
  assert.strictEqual(
    scoreRound({ opponent: Choice.Rock, you: Choice.Paper }),
    8
  );

  assert.strictEqual(
    scoreRound({ opponent: Choice.Paper, you: Choice.Rock }),
    1
  );
});

const realInput = readFileSync(path.join(__dirname, "input.txt")).toString();

test("part 1 real input is correct", () => {
  assert.strictEqual(solution.one(solution.parse(realInput)), 13565);
});

test("part 2 real input is correct", () => {
  assert.strictEqual(solution.two(solution.parse(realInput)), 12424);
});
