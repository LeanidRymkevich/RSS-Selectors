import { IElementCreator } from '../../util/elementCreator/interfaces';

export default interface IDisplayView {
  getTableBar(): IElementCreator;
  addItems(...items: (HTMLElement | IElementCreator)[]): void;
  addInnerHTML(html: string): void;
}
