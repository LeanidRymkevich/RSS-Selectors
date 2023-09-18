export interface Task {
  id: number;
  description: string;
  selector: string;
  code: string;
  codeWrapper: string;
}

export interface ICustomStorageHandler {
  getItemsNum(): number;
  getTask(id: number): Task;
}
