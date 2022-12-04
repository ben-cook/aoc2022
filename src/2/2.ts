import "../lib/filterMap";
import { Solution } from "../solution";

export enum Choice {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const parseChoice = (input: string): Choice | undefined => {
  switch (input) {
    case "A":
      return Choice.Rock;
    case "B":
      return Choice.Paper;
    case "C":
      return Choice.Scissors;
    case "X":
      return Choice.Rock;
    case "Y":
      return Choice.Paper;
    case "Z":
      return Choice.Scissors;
    default:
      return undefined;
  }
};

export enum Outcome {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

const parseOutcome = (input: string): Outcome | undefined => {
  switch (input) {
    case "X":
      return Outcome.Lose;
    case "Y":
      return Outcome.Draw;
    case "Z":
      return Outcome.Win;
    default:
      return undefined;
  }
};

const beats: Record<Choice, Choice> = {
  [Choice.Rock]: Choice.Scissors,
  [Choice.Paper]: Choice.Rock,
  [Choice.Scissors]: Choice.Paper,
};

interface Round {
  readonly opponent: Choice;
  readonly you: Choice;
}

export const evaluateRound = (round: Round): Outcome => {
  if (round.you === round.opponent) {
    return Outcome.Draw;
  }

  if (beats[round.you] === round.opponent) {
    return Outcome.Win;
  }

  return Outcome.Lose;
};

export const scoreRound = (round: Round): number => {
  return evaluateRound(round) + round.you;
};

const solution: Solution<string[]> = {
  parse(input: string) {
    return input.split("\n");
  },

  one(input: string[]) {
    return input
      .filterMap<string, Round>((line) => {
        const opponent = line.at(0);
        if (!opponent) return;
        const you = line.at(-1);
        if (!you) return;

        const opponentChoice = parseChoice(opponent);
        const youChoice = parseChoice(you);
        if (!opponentChoice || !youChoice) return;

        const round: Round = {
          opponent: opponentChoice,
          you: youChoice,
        };

        return round;
      })
      .map(scoreRound)
      .reduce((a, b) => a + b);
  },

  two(input: string[]) {
    return input
      .flatMap((line) => {
        const opponent = line.at(0);
        if (!opponent) return [];
        const outcomeRaw = line.at(-1);
        if (!outcomeRaw) return [];

        const opponentChoice = parseChoice(opponent);
        const outcome = parseOutcome(outcomeRaw);
        if (opponentChoice === undefined || outcome === undefined) return [];

        let youChoice;
        switch (outcome) {
          case Outcome.Draw:
            youChoice = opponentChoice;
            break;
          case Outcome.Lose:
            youChoice = beats[opponentChoice];
            break;
          case Outcome.Win:
            for (const choice in Choice) {
              if (
                beats[Choice[choice as keyof typeof Choice]] === opponentChoice
              ) {
                youChoice = Choice[choice as keyof typeof Choice];
              }
            }
            break;
          default:
            throw Error("Unreachable code");
        }

        const round: Round = {
          opponent: opponentChoice,
          you: youChoice || Choice.Paper,
        };

        return [round];
      })
      .map(scoreRound)
      .reduce((a, b) => a + b);
  },
};

export default solution;
