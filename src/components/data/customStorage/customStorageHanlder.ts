import { tasks } from './customStorage';
import { ICustomStorageHandler, Task } from './types';

export default class CustomStorageHandler implements ICustomStorageHandler {
  private static readonly instance: ICustomStorageHandler = new CustomStorageHandler();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): ICustomStorageHandler {
    return this.instance;
  }

  public getItemsNum(): number {
    return tasks.length;
  }

  public getTask(id: number): Task {
    const result: Task | undefined = tasks.find((task: Task): boolean => task.id === id);
    if (!result) throw new Error(`Task with id = ${id} not found!`);
    return result;
  }
}
