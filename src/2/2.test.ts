import assert from "node:assert";
import test from "node:test";
import { Choice, scoreRound } from "./2";

test("score round", () => {
  assert.strictEqual(
    scoreRound({ opponent: Choice.Rock, you: Choice.Paper }),
    8
  );

  assert.strictEqual(
    scoreRound({ opponent: Choice.Paper, you: Choice.Rock }),
    1
  );
});
