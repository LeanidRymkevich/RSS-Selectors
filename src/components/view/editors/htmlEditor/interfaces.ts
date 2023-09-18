import { IElementCreator } from '../../../util/elementCreator/interfaces';

export default interface IHtmlEditor {
  getFrame(): IElementCreator | null;
  renderHtmlCode(code: string): void;
}
