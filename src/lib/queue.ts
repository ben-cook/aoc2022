export class Queue<T> {
  data: T[];

  constructor(data?: T[]) {
    this.data = data ?? [];
  }

  public enqueue(item: T) {
    this.data.push(item);
  }

  public dequeue(): T | undefined {
    return this.data.shift();
  }

  public contains(item: T): boolean {
    return this.data.includes(item);
  }

  public peek(): T | undefined {
    return this.data.at(0);
  }

  public get length(): number {
    return this.data.length;
  }
}
