import { spawnSync } from "bun";
import path from "path";

const arg = process.argv[2];
const parsed = parseInt(arg, 10);

if (!isNaN(parsed) && 0 < parsed && parsed <= 25) {
  const testFile = path.join(
    import.meta.dir,
    "..",
    parsed.toString(),
    `${parsed}.test.ts`
  );

  const { stdout, stderr } = spawnSync({ cmd: ["bun", "wiptest", testFile] });

  console.log(stdout?.toString());
  console.log(stderr?.toString());
} else {
  console.log(`Unknown argument "${arg}": please input a number (1-25)`);
}
