export class Stack<T> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  public push(item: T) {
    this.data.push(item);
  }

  public pop(): T | undefined {
    return this.data.pop();
  }

  public peek(): T | undefined {
    return this.data.at(-1);
  }
}
