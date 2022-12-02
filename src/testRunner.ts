import { spawn } from "node:child_process";
import path from "path";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  const testFile = path.join(__dirname, parsed.toString(), `${parsed}.test.ts`);

  const testProcess = spawn("node", [
    "--loader",
    "ts-node/esm.mjs",
    "--test",
    testFile,
  ]);

  testProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  testProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  testProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
} else {
  console.log(`Unknown argument "${arg}": please input a number (1-25)`);
}
