import { Solution } from "../solution";

interface ThrowAction {
  item: number;
  destinationMonkey: number;
}

class Monkey {
  items: number[];
  operation: string;
  test: { divisor: number; trueMonkey: number; falseMonkey: number };
  inspectedCount = 0;

  constructor(
    startingItems: number[],
    operation: string,
    test: { divisor: number; trueMonkey: number; falseMonkey: number }
  ) {
    this.items = startingItems;
    this.operation = operation;
    this.test = test;
  }

  public action(divideByThree: boolean, modulo: number): ThrowAction[] {
    const actions = [];

    while (this.items.length > 0) {
      const item = this.items.shift()!;
      let result = eval(`const old = ${item}; ${this.operation};`);

      if (divideByThree) {
        result = Math.floor(result / 3);
      }

      if (modulo) {
        result = result % modulo;
      }

      let toThrow: number | undefined;
      if (result % this.test.divisor === 0) {
        toThrow = this.test.trueMonkey;
      } else {
        toThrow = this.test.falseMonkey;
      }

      this.inspectedCount++;
      actions.push({
        item: result,
        destinationMonkey: toThrow,
      });
    }

    return actions;
  }

  public printItems() {
    return this.items.join(", ");
  }
}

const solution: Solution<Monkey[]> = {
  parse(input: string) {
    return input.split("\n\n").map((monkeyString) => {
      const monkeyLines = monkeyString.split("\n");
      const startingItems: number[] = monkeyLines[1]
        .split(":")[1]
        .split(",")
        .map((x) => parseInt(x.trim()));
      const operation = monkeyLines[2].split("= ")[1];
      const testDivisor = parseInt(monkeyLines[3].split("by ")[1]);
      const trueMonkey = parseInt(monkeyLines[4].split("monkey ")[1]);
      const falseMonkey = parseInt(monkeyLines[5].split("monkey ")[1]);

      return new Monkey(startingItems, operation, {
        divisor: testDivisor,
        trueMonkey,
        falseMonkey,
      });
    });
  },

  one(monkeys: Monkey[]) {
    const modulo = monkeys
      .map((monkey) => monkey.test.divisor)
      .reduce((a, b) => a * b, 1);

    for (let round = 1; round <= 20; round++) {
      for (const monkey of monkeys) {
        const actions = monkey.action(true, modulo);
        for (const action of actions) {
          monkeys[action.destinationMonkey].items.push(action.item);
        }
      }
    }

    return monkeys
      .map((monkey) => monkey.inspectedCount)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((a, b) => a * b, 1);
  },

  two(monkeys: Monkey[]) {
    // Divide by the lowest common denominator of all the divisors
    // The lowest common denominator is the product of all the divisors
    // because the divisors are prime numbers
    const modulo = monkeys
      .map((monkey) => monkey.test.divisor)
      .reduce((a, b) => a * b, 1);

    for (let round = 1; round <= 10000; round++) {
      for (const monkey of monkeys) {
        const actions = monkey.action(false, modulo);
        for (const action of actions) {
          monkeys[action.destinationMonkey].items.push(action.item);
        }
      }
    }

    return monkeys
      .map((monkey) => monkey.inspectedCount)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((a, b) => a * b, 1);
  },
};

export default solution;
