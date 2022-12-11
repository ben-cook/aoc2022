import { Solution } from "../solution";

interface File {
  size: number;
  name: string;
}

interface Directory {
  name: string;
  children: Node[];
  parent?: Directory;
}

type Node = ({ type: "directory" } & Directory) | ({ type: "file" } & File);

type Command = { command: "cd"; to: string } | { command: "ls" };

const parseLine = (line: string): Command | Node => {
  const split = line.split(" ");

  if (line.startsWith("$")) {
    // This line is a command
    if (split[1] === "ls") {
      return { command: "ls" };
    }

    if (split[1] === "cd") {
      return { command: "cd", to: split[2] };
    }

    throw Error(`Unknown command: ${split[1]}`);
  }

  if (line.startsWith("dir")) {
    // This line is a directory
    return { type: "directory", name: split[1], children: [] };
  }

  const size = parseInt(split[0]);
  if (isNaN(size)) {
    throw new Error("Unknown size");
  }

  return { type: "file", size, name: split[1] };
};

const printDirectory = (dir: Directory, depthIncrement = 2) => {
  const stack: { depth: number; directory: Directory }[] = [
    { depth: 0, directory: dir },
  ];

  while (stack.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const current = stack.pop()!;
    console.log(
      " ".repeat(current.depth) + `- ${current.directory.name} (dir)`
    );

    const sortedChildren = current.directory.children.sort(
      (a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0)
    );

    sortedChildren.forEach((child) => {
      if (child.type === "directory") {
        stack.push({ depth: current.depth + depthIncrement, directory: child });
      }
      if (child.type === "file") {
        console.log(
          " ".repeat(current.depth + depthIncrement) +
            `- ${child.name} (file, size=${child.size})`
        );
      }
    });
  }
};

const calculateDirSize = (dir: Directory): number => {
  return dir.children.reduce((acc, child) => {
    if (child.type === "directory") {
      return acc + calculateDirSize(child);
    }
    return acc + child.size;
  }, 0);
};

const solution: Solution<Directory> = {
  parse(input: string) {
    let current: Directory = { name: "/", children: [] };
    let isLS = false;

    input
      .split("\n")
      .filter((line) => line !== "")
      .slice(1)
      .forEach((line) => {
        const parsed = parseLine(line);

        if ("command" in parsed) {
          // This is a command
          isLS = false;

          if (parsed.command === "ls") {
            // This is a ls command
            isLS = true;
            return;
          }

          // This is a cd command
          isLS = false;
          if (parsed.to === "..") {
            // Go up a directory
            if (!current.parent) {
              throw new Error("has no parent");
            }

            current = current.parent;
            return;
          }

          // Go down a directory
          const matchingChild = current.children.find(
            (file) => file.name === parsed.to && file.type === "directory"
          );
          if (!matchingChild) {
            throw new Error("Directory does not exist");
          } else {
            const { type, ...directory } = matchingChild as {
              type: "directory";
            } & Directory;
            current = directory;
          }
        }

        if ("type" in parsed) {
          // This is a file or directory
          if (!isLS) {
            throw new Error("Not in ls mode");
          }

          if (parsed.type === "file") {
            // This is a file
            current.children?.push(parsed);
            return;
          }

          // This is a directory
          const newDirectory: Directory = {
            name: parsed.name,
            parent: current,
            children: [],
          };
          current.children?.push({ type: "directory", ...newDirectory });
          return;
        }
      });

    // Return root directory
    while (current.parent) {
      current = current.parent;
    }

    return current;
  },

  one(input: Directory) {
    let totalSize = 0;
    const stack: Directory[] = [input];

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const current = stack.shift()!;

      current.children.forEach((child) => {
        if (child.type === "directory") {
          const size = calculateDirSize(child);

          if (size <= 100000) {
            totalSize += size;
          }

          stack.push(child);
        }
      });
    }

    return totalSize;
  },

  two(input: Directory) {
    const totalSpace = 70000000;
    const unusedSpace = 30000000;
    const rootSize = calculateDirSize(input);

    const wouldHaveEnoughSpaceIfDeleted: Directory[] = [input];

    const stack: Directory[] = [input];

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const current = stack.shift()!;

      current.children.forEach((child) => {
        if (child.type === "directory") {
          const size = calculateDirSize(child);

          if (rootSize - size < totalSpace - unusedSpace) {
            wouldHaveEnoughSpaceIfDeleted.push(child);
          }

          stack.push(child);
        }
      });
    }

    return calculateDirSize(
      wouldHaveEnoughSpaceIfDeleted.sort(
        (a, b) => calculateDirSize(a) - calculateDirSize(b)
      )[0]
    );
  },
};

export default solution;
