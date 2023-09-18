import { ICustomStorageHandler, Task } from '../data/customStorage/types';
import { ILocalStorageHandler } from '../data/localStorage/types';
import { cssEditor, htmlEditor } from '../view/editors/types';
import { display, editors, levels, taskDescription } from '../view/types';
import { ControllerParams, IController } from './types';

const SHAKE_CLASS = 'editors__container_shaking';
const SHAKE_DURATION = 300; // 200 + 100ms
const WIN_CLASS = 'table__bar_win';
const FLICKER_INPUT_CLASS = 'css-editor__input_empty';
const FUN_CLASS = 'fun';
const END_MESSAGE =
  'Congratulations!!! You have passed all levels. To start tasks again press "Reset Progress" button.';

export default class Controller implements IController {
  private localStorageHandler: ILocalStorageHandler;
  private customStorageHandler: ICustomStorageHandler;
  private description: taskDescription;
  private display: display;
  private levels: levels;
  private htmlEditor: htmlEditor;
  private editors: editors;

  private input: HTMLInputElement;
  private tableBar: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor(params: ControllerParams) {
    this.localStorageHandler = params.localStorageHandler;
    this.customStorageHandler = params.customStorageHandler;
    this.description = params.description;
    this.display = params.display;
    this.levels = params.levels;
    this.htmlEditor = params.htmlEditor;
    this.editors = params.editors;
    this.input = this.getInputElement(params.cssEditor);
    this.tableBar = this.display.getTableBar().getElement();
  }

  public startRendering(): void {
    const currentLevel: number = this.localStorageHandler.getLevelID();
    this.levels.markHintedItems(this.localStorageHandler.getHintedLevels());
    this.levels.markPassedItems(this.localStorageHandler.getPassedLevels());
    this.choseLevel(currentLevel);
  }

  public resetBtnLogic(): void {
    this.localStorageHandler.reset();
    this.endClear();
    this.levels.cancelAllMarking();
    this.choseLevel(1);
  }

  public inputLogic(): void {
    const selector: string = this.customStorageHandler.getTask(this.localStorageHandler.getLevelID()).selector;

    if (this.input.value !== selector) {
      const editorsContainer: HTMLElement = this.editors.getContainer();
      editorsContainer.classList.add(SHAKE_CLASS);
      setTimeout(() => editorsContainer.classList.remove(SHAKE_CLASS), SHAKE_DURATION);
    } else {
      this.goToNextLevel();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public helpBtnLogic(event: Event): void {
    const selector: string = this.customStorageHandler.getTask(this.localStorageHandler.getLevelID()).selector;
    this.localStorageHandler.updateHintedLevels(this.localStorageHandler.getLevelID());

    // writing in input
    this.input.value = '';
    this.input.focus();
    let i = 0;
    const speed = 300;

    const writer = (): void => {
      if (i < selector.length) {
        this.input.value += selector.charAt(i);
        i++;
        setTimeout(writer, speed, this.input);
      }
    };
    writer();
    this.description.getBtn().getElement().setAttribute('disabled', 'true');
  }

  public choseLevel(levelID: number): void {
    this.levels.removeActiveMark(this.localStorageHandler.getLevelID());
    this.localStorageHandler.updateLevel(levelID);
    this.loadLevel(levelID);
    this.tableBar.classList.remove(WIN_CLASS);
    this.description.getBtn().getElement().removeAttribute('disabled');
    this.inputClear();
  }

  private goToNextLevel(): void {
    const currentLevel: number = this.localStorageHandler.getLevelID();

    this.localStorageHandler.updatePassedLevels(currentLevel);
    this.levels.markHintedItems(this.localStorageHandler.getHintedLevels());
    this.levels.markPassedItems(this.localStorageHandler.getPassedLevels());
    this.tableBar.classList.add(WIN_CLASS);

    setTimeout(() => {
      if (currentLevel === this.customStorageHandler.getItemsNum()) {
        this.description.changeDescription(END_MESSAGE);
        this.endClear();
      } else {
        this.choseLevel(currentLevel + 1);
      }
    }, SHAKE_DURATION);
  }

  private loadLevel(levelID: number): void {
    const task: Task = this.customStorageHandler.getTask(levelID);
    this.description.changeDescription(task.description);
    this.levels.markActiveItem(levelID);
    this.display.addInnerHTML(task.code);
    this.htmlEditor.renderHtmlCode(task.codeWrapper);
    this.tableBar.querySelectorAll(task.selector).forEach((element) => element.classList.add(FUN_CLASS));
  }

  private getInputElement(editor: cssEditor): HTMLInputElement {
    const input: HTMLElement = editor.getInputCreator().getElement();
    if (!(input instanceof HTMLInputElement)) throw new Error('Input element in the CSS Editor not found!');
    return input;
  }

  private inputClear(): void {
    this.input.value = '';
    this.input.classList.add(FLICKER_INPUT_CLASS);
  }

  private endClear(): void {
    this.inputClear();
    this.display.addInnerHTML('');
    this.htmlEditor.renderHtmlCode('');
  }
}
