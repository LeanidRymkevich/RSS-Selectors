import { IElementCreator } from '../../util/elementCreator/interfaces';

export interface ILevelView {
  getLevelItems(): IElementCreator[];
  getLevelItem(levelNum: number): IElementCreator | null;
  cancelAllMarking(): void;
  markActiveItem(number: number): void;
  removeActiveMark(number: number): void;
  markPassedItems(numbers: number[]): void;
  markHintedItems(numbers: number[]): void;
  setCallbacks(itemCallback: itemCallback): void;
  setBtnCallback(btnHandler: btnCallback): void;
}

export type itemCallback = (levelID: number) => void;
export type btnCallback = () => void;
