import { IElementCreator } from '../../../util/elementCreator/interfaces';

export interface IEditorHeaderView {
  createHeader(params: HeaderParams): IElementCreator;
}

export interface HeaderParams {
  headerClasses: string[];
  titleClasses: string[];
  fileNameClasses: string[];
  titleText: string;
  fileNameText: string;
}
