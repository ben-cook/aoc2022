import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import path from "path";
import solution from "./6";

const sampleInputs = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

test("part 1 sample input 1", () => {
  expect(solution.one(solution.parse(sampleInputs[0]))).toBe(7);
});
test("part 1 sample input 2", () => {
  expect(solution.one(solution.parse(sampleInputs[1]))).toBe(5);
});
test("part 1 sample input 3", () => {
  expect(solution.one(solution.parse(sampleInputs[2]))).toBe(6);
});
test("part 1 sample input 4", () => {
  expect(solution.one(solution.parse(sampleInputs[3]))).toBe(10);
});
test("part 1 sample input 5", () => {
  expect(solution.one(solution.parse(sampleInputs[4]))).toBe(11);
});

test("part 2 sample input 1", () => {
  expect(solution.two(solution.parse(sampleInputs[0]))).toBe(19);
});
test("part 2 sample input 2", () => {
  expect(solution.two(solution.parse(sampleInputs[1]))).toBe(23);
});
test("part 2 sample input 3", () => {
  expect(solution.two(solution.parse(sampleInputs[2]))).toBe(23);
});
test("part 2 sample input 4", () => {
  expect(solution.two(solution.parse(sampleInputs[3]))).toBe(29);
});
test("part 2 sample input 5", () => {
  expect(solution.two(solution.parse(sampleInputs[4]))).toBe(26);
});

const realInput = readFileSync(
  path.join(import.meta.dir, "input.txt")
).toString();

test("part 1 real input is 1582", () => {
  expect(solution.one(solution.parse(realInput))).toBe(1582);
});

test("part 2 real input is 3588", () => {
  expect(solution.two(solution.parse(realInput))).toBe(3588);
});
