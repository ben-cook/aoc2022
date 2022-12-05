import { readFileSync } from "fs";
import path from "path";

import { Solution } from "../solution";

export const init = async (day: number) => {
  const input = readInput(day);
  const sampleInput = readSampleInput(day);
  const solution = await getDay(day);

  return { input, solution, sampleInput };
};

interface RunArgs {
  input?: string;
  solution?: Solution<unknown>;
  day: number;
}

export const run = ({ input, solution, day }: RunArgs) => {
  if (input && solution) {
    const answer1 = solution.one(solution.parse(input));
    const formattedAnswer1 = String(answer1).padEnd(10);

    const answer2 = solution.two(solution.parse(input));
    const formattedAnswer2 = String(answer2).padEnd(10);

    console.log(`[Day ${day}]`);
    console.log(` Part 1: ${formattedAnswer1}`);
    console.log(` Part 2: ${formattedAnswer2}`);
  }
};

const getDay = async (day: number) => {
  try {
    const { default: importedDay } = await import(`../${day}/${day}`);
    return importedDay as Solution<unknown>;
  } catch {
    return undefined;
  }
};

const readInput = (day: number): string | undefined => {
  try {
    const input = readFileSync(
      path.join(import.meta.dir, "..", day.toString(), "input.txt")
    );
    if (!input) return;
    return input.toString("utf8");
  } catch {
    return;
  }
};

const readSampleInput = (day: number): string | undefined => {
  try {
    const input = readFileSync(
      path.join(import.meta.dir, "..", day.toString(), "sample_input.txt")
    );
    if (!input) return;
    return input.toString("utf8");
  } catch {
    return;
  }
};
