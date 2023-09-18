import './cssEditor.scss';
import View from '../../view/view';
import ElementCreator from '../../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../../util/elementCreator/interfaces';
import { HeaderParams, IEditorHeaderView } from '../editorHeader/interfaces';
import INumberedLineView from '../numberedLine/interfaces';
import NumberedLineView from '../numberedLine/numberedLineView';
import { ICssEditor, selectorHandler } from './interfaces';
import IView from '../../view/interfaces';
import EditorHeaderView from '../editorHeader/editorHeaderView';

const CSS_EDITOR_TAG = 'div';
const CSS_EDITOR_CLASS_NAMES: string[] = ['editor', 'css-editor'];

// header elements properties
const CSS_HEADER_CLASS_NAMES: string[] = ['css-editor__header'];
const TITLE_CLASS_NAMES: string[] = ['css-editor__title'];
const FILE_NAME_CLASS_NAMES: string[] = ['css-editor__file-name'];
const TITLE_TEXT_CONTENT = 'CSS Editor';
const FILE_NAME_CONTENT = 'style.css';

// numbered line properties
const LINE_CLASS_NAMES: string[] = ['css-editor__line'];

// workspace properties
const WORKSPACE_EDITOR_TAG = 'div';
const WORKSPACE_CLASS_NAMES: string[] = ['css-editor__workspace'];

// selector input properties
const SELECTOR_INPUT_TAG = 'div';
const SELECTOR_INPUT_CLASS_NAMES: string[] = ['css-editor__selector-input'];

const INPUT_TAG = 'input';
const FLICKER_INPUT_CLASS = 'css-editor__input_empty';
const INPUT_CLASS_NAMES: string[] = ['css-editor__input', FLICKER_INPUT_CLASS];
const INPUT_PLACEHOLDER = 'Type in a CSS selector';
const INPUT_ATTRIBUTES: Record<string, string> = {
  type: 'text',
  placeholder: INPUT_PLACEHOLDER,
};

const BTN_TAG = 'button';
const BTN_CLASS_NAMES: string[] = ['btn', 'css-editor__btn'];
const BTN_ATTRIBUTES: Record<string, string> = { type: 'button' };
const INPUT_TEXT_CONTENT = 'Enter';

// CSS Editor text properties
const TEXT_TAG = 'div';
const TEXT_CLASS_NAMES: string[] = ['css-editor__text'];
const TEXT_STRING_ROWS: string[] = ['{', '/* Styles would go here */', '}'];

export default class CssEditorView extends View implements ICssEditor {
  private input: IElementCreator;
  private btn: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: CSS_EDITOR_TAG,
      classNames: CSS_EDITOR_CLASS_NAMES,
    };
    super(params);
    this.input = this.createInput();
    this.btn = this.createBtn();
    this.configureView();
  }

  public getInputCreator(): IElementCreator {
    return this.input;
  }

  public getBtnCreator(): IElementCreator {
    return this.btn;
  }

  public setSelectorInputHandler(selectorHandler: selectorHandler): void {
    this.input.setListeners([
      {
        event: 'keydown',
        callback: (event: Event): void => {
          if (event instanceof KeyboardEvent && event.code === 'Enter') {
            selectorHandler();
          }
        },
      },
    ]);

    this.btn.setListeners([
      {
        event: 'click',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        callback: (event: Event): void => {
          selectorHandler();
        },
      },
    ]);
  }

  protected configureView(): void {
    const header: IElementCreator = this.createHeader();
    const numberedLine: IView & INumberedLineView = new NumberedLineView();
    const workspace = this.createWorkspace();

    numberedLine.setLineClasses(LINE_CLASS_NAMES);
    this.getViewCreator().addInnerElement(header, numberedLine.getViewCreator(), workspace);
  }

  private createHeader(): IElementCreator {
    const header: IView & IEditorHeaderView = new EditorHeaderView();
    const params: HeaderParams = {
      headerClasses: CSS_HEADER_CLASS_NAMES,
      titleClasses: TITLE_CLASS_NAMES,
      fileNameClasses: FILE_NAME_CLASS_NAMES,
      titleText: TITLE_TEXT_CONTENT,
      fileNameText: FILE_NAME_CONTENT,
    };

    return header.createHeader(params);
  }

  private createWorkspace(): IElementCreator {
    const workspaceParams: ElementCreatorParams = {
      tag: WORKSPACE_EDITOR_TAG,
      classNames: WORKSPACE_CLASS_NAMES,
    };
    const workspaceCreator: IElementCreator = new ElementCreator(workspaceParams);
    const selectorInputCreator: IElementCreator = this.createSelectorInput();
    const textCreator: IElementCreator = this.createEditorText();

    workspaceCreator.addInnerElement(selectorInputCreator, textCreator);
    return workspaceCreator;
  }

  private createEditorText(): IElementCreator {
    const textParams: ElementCreatorParams = {
      tag: TEXT_TAG,
      classNames: TEXT_CLASS_NAMES,
    };
    const textCreator: IElementCreator = new ElementCreator(textParams);

    TEXT_STRING_ROWS.forEach((string: string): void => {
      const params: ElementCreatorParams = {
        tag: TEXT_TAG,
        textContent: string,
      };
      const rowCreator: IElementCreator = new ElementCreator(params);
      textCreator.addInnerElement(rowCreator);
    });
    return textCreator;
  }

  private createInput(): IElementCreator {
    const inputParams: ElementCreatorParams = {
      tag: INPUT_TAG,
      classNames: INPUT_CLASS_NAMES,
      attributes: INPUT_ATTRIBUTES,
      listenersParams: [{ event: 'blur', callback: this.inputBlurHandler }],
    };
    return new ElementCreator(inputParams);
  }

  private createBtn(): IElementCreator {
    const btnParams: ElementCreatorParams = {
      tag: BTN_TAG,
      classNames: BTN_CLASS_NAMES,
      attributes: BTN_ATTRIBUTES,
      textContent: INPUT_TEXT_CONTENT,
    };
    return new ElementCreator(btnParams);
  }

  private createSelectorInput(): IElementCreator {
    const selectorInputParams: ElementCreatorParams = {
      tag: SELECTOR_INPUT_TAG,
      classNames: SELECTOR_INPUT_CLASS_NAMES,
    };
    const selectorInputCreator: IElementCreator = new ElementCreator(selectorInputParams);

    selectorInputCreator.addInnerElement(this.input, this.btn);
    return selectorInputCreator;
  }

  private inputBlurHandler(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value !== '') {
        event.target.classList.remove(FLICKER_INPUT_CLASS);
      } else {
        event.target.classList.add(FLICKER_INPUT_CLASS);
      }
    }
  }
}
