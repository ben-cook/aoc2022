import { Solution } from "../solution";

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

class Knot {
  x: number;
  y: number;
  label: string;

  constructor(label: string | number) {
    this.x = 0;
    this.y = 0;
    this.label = label.toString();
  }

  private distance(other: Knot) {
    return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y));
  }

  public follow(target: Knot) {
    if (this.distance(target) > 1) {
      if (target.x > this.x) {
        this.x += 1;
      }
      if (target.x < this.x) {
        this.x -= 1;
      }
      if (target.y > this.y) {
        this.y += 1;
      }
      if (target.y < this.y) {
        this.y -= 1;
      }
    }
  }

  public moveInDirection(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        this.y += 1;
        break;
      case Direction.Down:
        this.y -= 1;
        break;
      case Direction.Left:
        this.x -= 1;
        break;
      case Direction.Right:
        this.x += 1;
        break;
      default:
        throw new Error("Invalid direction");
    }
  }

  public get hash(): number {
    return this.x * 100000 + this.y;
  }
}

const display = (knots: Knot[], length: number) => {
  const grid = new Array(length * 2)
    .fill(0)
    .map(() => new Array(length * 2).fill("."));
  grid[grid.length - length / 2][length / 2] = "S";
  for (let i = knots.length - 1; i >= 0; i--) {
    const knot = knots[i];
    grid[grid.length - (knot.y + length / 2)][knot.x + length / 2] = knot.label;
  }
  console.log(grid.map((row) => row.join("")).join("\n") + "\n");
};

const solution: Solution<Direction[]> = {
  parse(input: string) {
    return input
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => {
        const [direction, distance] = line.split(" ");
        return {
          direction:
            direction === "U"
              ? Direction.Up
              : direction === "D"
              ? Direction.Down
              : direction === "L"
              ? Direction.Left
              : Direction.Right,
          distance: parseInt(distance, 10),
        };
      })
      .flatMap(({ direction, distance }) => {
        switch (direction) {
          case Direction.Up:
            return Array(distance).fill(Direction.Up);
          case Direction.Down:
            return Array(distance).fill(Direction.Down);
          case Direction.Left:
            return Array(distance).fill(Direction.Left);
          case Direction.Right:
            return Array(distance).fill(Direction.Right);
          default:
            throw new Error("Invalid direction");
        }
      });
  },

  one(input: Direction[]) {
    const head = new Knot("H");
    const tail = new Knot("T");
    const visited = new Set<number>();

    for (const direction of input) {
      head.moveInDirection(direction);
      tail.follow(head);
      visited.add(tail.hash);
    }

    return visited.size;
  },

  two(input: Direction[]) {
    const knots: Knot[] = [new Knot("H")];
    for (let i = 0; i < 9; i++) {
      knots.push(new Knot(i + 1));
    }
    const visited = new Set<number>();

    const head = knots[0];
    const tail = knots[9];

    for (const direction of input) {
      // display(knots, 6);
      head.moveInDirection(direction);
      for (let i = 1; i < 10; i++) {
        knots[i].follow(knots[i - 1]);
      }
      visited.add(tail.hash);
    }

    return visited.size;
  },
};

export default solution;
