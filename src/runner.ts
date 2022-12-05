import { readFileSync } from "fs";
import path from "path";

import { Solution } from "./solution";

interface InitReturnType {
  input?: string;
  solution?: Solution<unknown>;
}

export const init = async (day: number): Promise<InitReturnType> => {
  const input = readInput(day);
  const solution = await getDay(day);

  return { input, solution };
};

const getDay = async (day: number) => {
  try {
    const { default: importedDay } = await import(`./${day}/${day}`);
    return importedDay as Solution<unknown>;
  } catch {
    return undefined;
  }
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
