import { ILocalStorageHandler, IState } from './types';

const LOCAL_STORAGE_NOTE = 'state';
const DEFAULT_STATE: IState = {
  level: 1,
  passedLevels: [],
  hintedLevels: [],
};

export default class LocalStorageHandler {
  private static readonly instance: ILocalStorageHandler = new LocalStorageHandler();

  private state: IState = this.getState();

  private constructor() {
    this.saveBeforeUnload();
  }

  public static getInstance(): ILocalStorageHandler {
    return this.instance;
  }

  public reset(): void {
    this.state.level = 1;
    this.state.passedLevels = [];
    this.state.hintedLevels = [];
  }

  public updateLevel(level: number): void {
    this.state.level = level;
  }

  public updatePassedLevels(level: number): void {
    if (this.state.passedLevels.includes(level)) return;
    this.state.passedLevels.push(level);
  }

  public updateHintedLevels(level: number): void {
    if (this.state.hintedLevels.includes(level)) return;
    this.state.hintedLevels.push(level);
  }

  public getLevelID(): number {
    return this.state.level;
  }

  public getPassedLevels(): number[] {
    return this.state.passedLevels;
  }

  public getHintedLevels(): number[] {
    return this.state.hintedLevels;
  }

  private saveBeforeUnload(): void {
    window.addEventListener('beforeunload', (): void => {
      const state: string = JSON.stringify(this.state);
      localStorage.removeItem(LOCAL_STORAGE_NOTE);
      localStorage.setItem(LOCAL_STORAGE_NOTE, state);
    });
  }

  private getState(): IState {
    const stateString: string | null = localStorage.getItem(LOCAL_STORAGE_NOTE);
    const state: IState = stateString ? JSON.parse(stateString) : DEFAULT_STATE;
    return state;
  }
}
