import { Item } from "./item";

export class Group {
  commonItem: Item;

  constructor(triple: string[]) {
    const [one, two, three] = triple;

    this.commonItem = new Item(
      [...one.split("")]
        .filter((char) => two.includes(char))
        .filter((char) => three.includes(char))[0]
    );
  }
}
