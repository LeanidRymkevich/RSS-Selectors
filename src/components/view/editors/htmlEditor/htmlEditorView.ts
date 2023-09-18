import './htmlEditor.scss';
import View from '../../view/view';
import ElementCreator from '../../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../../util/elementCreator/interfaces';
import EditorHeaderView from '../editorHeader/editorHeaderView';
import { IEditorHeaderView, HeaderParams } from '../editorHeader/interfaces';
import INumberedLineView from '../numberedLine/interfaces';
import NumberedLineView from '../numberedLine/numberedLineView';
import IView from '../../view/interfaces';
import IHtmlEditor from './interfaces';

const HTML_EDITOR_TAG = 'div';
const HTML_EDITOR_CLASS_NAMES: string[] = ['editor', 'html-editor'];

// header elements properties
const HTML_HEADER_CLASS_NAMES: string[] = ['html-editor__header'];
const TITLE_CLASS_NAMES: string[] = ['html-editor__title'];
const FILE_NAME_CLASS_NAMES: string[] = ['html-editor__file-name'];
const TITLE_TEXT_CONTENT = 'HTML Editor';
const FILE_NAME_CONTENT = 'display.html';

// numbered line properties
const LINE_CLASS_NAMES: string[] = ['html-editor__line'];

// workspace properties
const WORKSPACE_EDITOR_TAG = 'div';
const WORKSPACE_CLASS_NAMES: string[] = ['html-editor__workspace'];

// WORKSPACE FRAME properties
const FRAME_TAG = 'div';
const FRAME_CLASS_NAMES: string[] = ['html-editor__text'];

export default class HtmlEditorView extends View implements IHtmlEditor {
  private frame: IElementCreator | null = null;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: HTML_EDITOR_TAG,
      classNames: HTML_EDITOR_CLASS_NAMES,
    };
    super(params);
    this.configureView();
  }

  public getFrame(): IElementCreator | null {
    return this.frame;
  }

  public renderHtmlCode(code: string): void {
    if (this.frame) this.frame.getElement().innerHTML = code;
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
      headerClasses: HTML_HEADER_CLASS_NAMES,
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

    const frameParams: ElementCreatorParams = {
      tag: FRAME_TAG,
      classNames: FRAME_CLASS_NAMES,
    };
    this.frame = new ElementCreator(frameParams);

    workspaceCreator.addInnerElement(this.frame);
    return workspaceCreator;
  }
}
