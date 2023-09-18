import './editor.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';
import CssEditorView from './cssEditor/cssEditorView';
import HtmlEditorView from './htmlEditor/htmlEditorView';
import { IEditorView, cssEditor, htmlEditor } from './types';

const EDITOR_TAG = 'section';
const EDITOR_CLASS_NAMES: string[] = ['editors'];

//container properties
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAMES: string[] = ['container', 'editors__container'];

export default class EditorView extends View implements IEditorView {
  private cssEditor: cssEditor;
  private htmlEditor: htmlEditor;
  private container: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: EDITOR_TAG,
      classNames: EDITOR_CLASS_NAMES,
    };
    super(params);
    this.container = this.createContainer();
    this.cssEditor = new CssEditorView();
    this.htmlEditor = new HtmlEditorView();
    this.configureView();
  }

  public getContainer(): HTMLElement {
    return this.container.getElement();
  }

  public getCssEditor(): cssEditor {
    return this.cssEditor;
  }

  public getHtmlEditor(): htmlEditor {
    return this.htmlEditor;
  }

  protected configureView(): void {
    this.container.addInnerElement(this.cssEditor.getViewCreator(), this.htmlEditor.getViewCreator());
    this.getViewCreator().addInnerElement(this.container);
  }

  private createContainer(): IElementCreator {
    const params: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: CONTAINER_CLASS_NAMES,
    };
    return new ElementCreator(params);
  }
}
