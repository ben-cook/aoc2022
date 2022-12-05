import { init } from "./runner";
import { Solution } from "./solution";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

const run = async (day: number) => {
  const { input, solution } = await init(day);
  if (!input || !solution) return;

  timeSolution({ input, solution, day });
};

interface TimeSolutionArgs<T> {
  input: string;
  solution: Solution<T>;
  day: number;
}

const timeSolution = <T>({ input, solution, day }: TimeSolutionArgs<T>) => {
  console.log(`[Day ${day}]`);
  timePart({
    input,
    fn: (input) => solution.one(solution.parse(input)),
    part: 1,
  });
  timePart({
    input,
    fn: (input) => solution.two(solution.parse(input)),
    part: 2,
  });
};

interface TimePartArgs<T> {
  input: T;
  fn: (input: T) => number | string;
  part: number;
  retries?: number;
}

const timePart = <T>({ input, fn, part, retries = 10 }: TimePartArgs<T>) => {
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

const main = async () => {
  if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
    run(parsed);
  } else if (arg === "all") {
    for (let i = 1; i <= 25; i++) {
      await run(i);
    }
  } else {
    console.log(
      `Unknown argument "${arg}": please input a number (1-25) or 'all'`
    );
  }
};

main();
