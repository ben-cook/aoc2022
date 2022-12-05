import "../lib";
import { Solution } from "../solution";

class CrateStacker {
  public stacks: string[][];

  constructor(stacks: string[][]) {
    this.stacks = stacks;
  }

  public doPartOne({ from, to, amount }: Instruction) {
    for (let i = 0; i < amount; i++) {
      this.move(from, to);
    }
  }

  public doPartTwo({ from, to, amount }: Instruction) {
    if (amount === 1) {
      this.move(from, to);
      return;
    }

    const stackMoved = [];
    for (let i = 0; i < amount; i++) {
      const popped = this.stacks[from].pop();
      if (!popped) {
        throw Error("error popping");
      }
      stackMoved.push(popped);
    }

    this.stacks[to] = this.stacks[to].concat(stackMoved.reverse());
  }

  private move(from: number, to: number) {
    const top = this.stacks[from].pop();
    if (!top) {
      throw Error(`Couldn't pop from empty stack ${from}`);
    }
    this.stacks[to].push(top);
  }

  public getTops(): string {
    const out = [];
    for (let i = 1; i < this.stacks.length; i++) {
      out.push(this.stacks[i].peek());
    }
    return out.join("");
  }
}

interface Instruction {
  from: number;
  to: number;
  amount: number;
}

interface ParseResult {
  crateStacker: CrateStacker;
  instructions: Instruction[];
}

const solution: Solution<ParseResult> = {
  parse(input: string) {
    const lines = input.split("\n");
    const firstEmptyLine = lines.findIndex((line) => line === "");

    const [drawing, rawInstructions] = [
      lines.slice(0, firstEmptyLine),
      lines.slice(firstEmptyLine + 1).filter((line) => line !== ""),
    ];

    // Parse drawing
    const drawingLineLength = drawing[0].length;
    const drawingLength = drawing.length;

    const data: string[][] = [[]];

    for (
      let drawingRawColumn = 1;
      drawingRawColumn < drawingLineLength;
      drawingRawColumn += 4
    ) {
      const columnData = [];
      for (
        let drawingRawRow = 0;
        drawingRawRow < drawingLength;
        drawingRawRow++
      ) {
        const currentSpot = drawing[drawingRawRow][drawingRawColumn];
        if (currentSpot === " " || !isNaN(parseInt(currentSpot, 10))) continue;
        columnData.push(currentSpot);
      }
      data.push(columnData.reverse());
    }

    const crateStacker = new CrateStacker(data);

    // Parse instructions
    const instructions: Instruction[] = rawInstructions.map((raw) => {
      const split = raw.split(" ");
      const instruction: Instruction = {
        from: parseInt(split[3], 10),
        to: parseInt(split[5], 10),
        amount: parseInt(split[1], 10),
      };
      return instruction;
    });

    return {
      crateStacker,
      instructions,
    };
  },

  one({ instructions, crateStacker }: ParseResult) {
    for (const instruction of instructions) {
      crateStacker.doPartOne(instruction);
    }

    return crateStacker.getTops();
  },

  two({ instructions, crateStacker }: ParseResult) {
    for (const instruction of instructions) {
      crateStacker.doPartTwo(instruction);
    }

    return crateStacker.getTops();
  },
};

export default solution;
