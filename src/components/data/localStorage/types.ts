export interface ILocalStorageHandler {
  reset(): void;
  updateLevel(level: number): void;
  updatePassedLevels(level: number): void;
  updateHintedLevels(level: number): void;
  getLevelID(): number;
  getPassedLevels(): number[];
  getHintedLevels(): number[];
}

export interface IState {
  level: number;
  passedLevels: number[];
  hintedLevels: number[];
}
