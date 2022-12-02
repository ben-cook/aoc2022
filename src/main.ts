import { run } from "./runner";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  run(parsed);
} else if (arg === "all") {
  for (let i = 1; i <= 25; i++) {
    run(i);
  }
} else {
  console.log(
    `Unknown argument "${arg}": please input a number (1-25) or 'all'`
  );
}
