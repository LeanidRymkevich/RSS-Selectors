import { IElementCreator } from '../../../util/elementCreator/interfaces';

export interface ICssEditor {
  getInputCreator(): IElementCreator;
  getBtnCreator(): IElementCreator;
  setSelectorInputHandler(selectorHandler: selectorHandler): void;
}

export type selectorHandler = () => void;
