import { Solution } from "../solution";

type Instruction = { name: "addx"; value: number } | { name: "noop" };

const display = (drawing: string[]) => {
  for (let i = 0; i < 260; i += 40) {
    console.log(drawing.slice(i, i + 39).join(""));
  }
};

const solution: Solution<Instruction[]> = {
  parse(input: string): Instruction[] {
    return input
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => {
        if (line.startsWith("noop")) {
          return { name: "noop" };
        }

        if (line.startsWith("addx")) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, value] = line.split(" ");
          return { name: "addx", value: parseInt(value, 10) };
        }

        throw new Error("Invalid instruction");
      });
  },

  one(instructions: Instruction[]) {
    let x = 1;
    let cycle = 1;
    let ip = 0;
    const signalStrengths: number[] = [];
    let addNextCycle: number | undefined = undefined;

    while (cycle <= 240) {
      const instruction = instructions[ip];

      if ((cycle + 20) % 40 === 0) {
        signalStrengths.push(x * cycle);
      }

      if (addNextCycle !== undefined) {
        x += addNextCycle;
        addNextCycle = undefined;
      } else {
        switch (instruction.name) {
          case "addx":
            addNextCycle = instruction.value;
            break;
          case "noop":
            break;
          default:
            throw new Error("Invalid instruction");
        }
        ip++;
      }

      cycle++;
    }

    return signalStrengths.reduce((a, b) => a + b);
  },

  two(instructions: Instruction[]) {
    let x = 1;
    let cycle = 1;
    let ip = 0;
    let amountToAddNextCycle: number | undefined = undefined;

    const drawing: string[] = [];

    while (cycle <= 240) {
      const instruction = instructions[ip];
      const position = (cycle - 1) % 40;

      let enableAddNextCycle: [boolean, number] = [false, 0];

      if (amountToAddNextCycle === undefined) {
        switch (instruction.name) {
          case "addx":
            enableAddNextCycle = [true, instruction.value];
            break;
          case "noop":
            break;
          default:
            throw new Error("Invalid instruction");
        }
        ip++;
      }

      // Draw █ if sprite is visible
      if (Math.abs(x - position) <= 1) {
        drawing.push("█");
      } else {
        drawing.push(".");
      }

      if (amountToAddNextCycle !== undefined) {
        x += amountToAddNextCycle;
        amountToAddNextCycle = undefined;
      }

      if (enableAddNextCycle[0]) {
        amountToAddNextCycle = enableAddNextCycle[1];
      }

      cycle++;
    }

    // display(drawing);

    return 0;
  },
};

export default solution;
