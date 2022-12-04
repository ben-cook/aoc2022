import { Solution } from "../solution";

interface Range {
  start: number;
  end: number;
}

interface Pair {
  range1: Range;
  range2: Range;
}

const solution: Solution<Pair[]> = {
  parse(input: string) {
    return input
      .split("\n")
      .filter((line) => line !== "")
      .map((line): Pair => {
        const [rawRange1, rawRange2] = line.split(",");
        const [range1start, range1end] = rawRange1.split("-");
        const [range2start, range2end] = rawRange2.split("-");

        const range1: Range = {
          start: parseInt(range1start, 10),
          end: parseInt(range1end, 10),
        };

        const range2: Range = {
          start: parseInt(range2start, 10),
          end: parseInt(range2end, 10),
        };

        return {
          range1,
          range2,
        };
      });
  },

  one(input: Pair[]) {
    const fullyContains = (range1: Range, range2: Range): boolean => {
      return range1.start <= range2.start && range1.end >= range2.end;
    };

    return input.filter(
      ({ range1, range2 }) =>
        fullyContains(range1, range2) || fullyContains(range2, range1)
    ).length;
  },

  two(input: Pair[]) {
    return input.filter(({ range1, range2 }) => {
      const scenario1 = range2.start <= range1.end && range1.end <= range2.end;
      const scenario2 = range1.start <= range2.end && range2.end <= range1.end;
      return scenario1 || scenario2;
    }).length;
  },
};

export default solution;
