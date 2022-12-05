import { readFileSync } from "fs";
import path from "path";
import { performance } from "perf_hooks";

import { Solution } from "./solution";

export const run = async (day: number) => {
  const input = readInput(day);
  if (!input) return;
  const solution = await getDay(day);

  console.log(`[Day ${day}]`);
  timeSolution({
    input,
    fn: (input) => solution.one(solution.parse(input)),
    part: 1,
  });
  timeSolution({
    input,
    fn: (input) => solution.two(solution.parse(input)),
    part: 2,
  });
};

const timeSolution = <T>({
  input,
  fn,
  part,
  retries = 1,
}: {
  input: T;
  fn: (input: T) => number | string;
  part: number;
  retries?: number;
}) => {
  try {
    let totalTime = 0;

    for (let i = 0; i < retries; i++) {
      const before = performance.now();
      fn(input);
      const after = performance.now();
      totalTime += after - before;
    }
    const averageTime = totalTime / retries;
    const answer = fn(input);
    const formattedAnswer = String(answer).padEnd(10);

    console.log(
      ` Part ${part}: ${formattedAnswer} (${averageTime.toFixed(
        4
      )} ms, avg of ${retries})`
    );
  } catch (err) {
    console.error(err);
  }
};

const getDay = async (day: number) => {
  const { default: importedDay } = await import(`./${day}/${day}`);
  return importedDay as Solution<unknown>;
};

const readInput = (day: number): string | undefined => {
  try {
    const input = readFileSync(
      path.join(__dirname, day.toString(), "input.txt")
    );
    if (!input) return;
    return input.toString("utf8");
  } catch {
    return;
  }
};
