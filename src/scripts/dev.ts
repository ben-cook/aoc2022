import { init, run } from "./utils";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  init(parsed).then(({ input, solution }) =>
    run({ input, solution, day: parsed })
  );
} else {
  console.log(`Unknown argument "${arg}": please input a number (1-25)`);
}
