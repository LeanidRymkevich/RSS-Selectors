import { ICustomStorageHandler } from '../data/customStorage/types';
import { ILocalStorageHandler } from '../data/localStorage/types';
import { cssEditor, htmlEditor } from '../view/editors/types';
import { display, editors, levels, taskDescription } from '../view/types';

export interface IController {
  choseLevel(levelID: number): void;
  helpBtnLogic(event: Event): void;
  inputLogic(): void;
  resetBtnLogic(): void;
  startRendering(): void;
}

export interface ControllerParams {
  localStorageHandler: ILocalStorageHandler;
  customStorageHandler: ICustomStorageHandler;
  description: taskDescription;
  display: display;
  levels: levels;
  cssEditor: cssEditor;
  htmlEditor: htmlEditor;
  editors: editors;
}
