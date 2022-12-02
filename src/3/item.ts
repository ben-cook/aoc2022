export class Item {
  character: string;

  constructor(character: string) {
    if (character.length !== 1) {
      throw Error(`Invalid item: ${character}`);
    }

    this.character = character;
  }

  public get priority() {
    const ascii = this.character.charCodeAt(0);
    if (ascii < 97) {
      return ascii - 65 + 1 + 26;
    } else {
      return ascii - 97 + 1;
    }
  }
}
