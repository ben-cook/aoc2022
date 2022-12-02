import { Item } from "./item";

export class Rucksack {
  compartment1: Item[];
  compartment2: Item[];
  commonItem: Item | undefined;

  constructor(items: string) {
    this.compartment1 = items
      .slice(0, items.length / 2)
      .split("")
      .map((character) => new Item(character));

    this.compartment2 = items
      .slice(items.length / 2)
      .split("")
      .map((character) => new Item(character));

    const seen = new Set();
    for (const character of items.slice(0, items.length / 2)) {
      seen.add(character);
    }
    for (const character of items.slice(items.length / 2)) {
      if (seen.has(character)) {
        this.commonItem = new Item(character);
        break;
      }
    }

    if (this.commonItem === undefined)
      throw Error("could not find common item");
  }
}
