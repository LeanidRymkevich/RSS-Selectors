import IView from '../view/interfaces';
import { ICssEditor } from './cssEditor/interfaces';
import IHtmlEditor from './htmlEditor/interfaces';

export type cssEditor = IView & ICssEditor;
export type htmlEditor = IView & IHtmlEditor;

export interface IEditorView {
  getContainer(): HTMLElement;
  getCssEditor(): cssEditor;
  getHtmlEditor(): htmlEditor;
}
