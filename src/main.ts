import { init } from "./runner";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  init(parsed).then(({ input, solution }) => {
    if (input && solution) {
      const answer1 = solution.one(solution.parse(input));
      const formattedAnswer1 = String(answer1).padEnd(10);

      const answer2 = solution.two(solution.parse(input));
      const formattedAnswer2 = String(answer2).padEnd(10);

      console.log(`[Day ${parsed}]`);
      console.log(` Part 1: ${formattedAnswer1}`);
      console.log(` Part 2: ${formattedAnswer2}`);
    }
  });
} else {
  console.log(`Unknown argument "${arg}": please input a number (1-25)`);
}
