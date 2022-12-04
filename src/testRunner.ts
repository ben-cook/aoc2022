import { spawnSync } from "node:child_process";
import path from "path";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  const testFile = path.join(__dirname, parsed.toString(), `${parsed}.test.ts`);

  const testProcess = spawnSync(
    "node",
    ["--no-warnings", "--loader", "ts-node/esm.mjs", "--test", testFile],
    { encoding: "utf8" }
  );

  console.log(testProcess.stdout);
} else {
  console.log(`Unknown argument "${arg}": please input a number (1-25)`);
}
