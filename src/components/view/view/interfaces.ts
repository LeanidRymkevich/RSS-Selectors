import { IElementCreator } from '../../util/elementCreator/interfaces';

export default interface IView {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
}
