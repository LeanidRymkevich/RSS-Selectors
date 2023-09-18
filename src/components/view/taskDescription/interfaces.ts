import { IElementCreator } from '../../util/elementCreator/interfaces';

export default interface ITaskDescription {
  getBtn(): IElementCreator;
  changeDescription(content: string): void;
  setBtnHandler(btnCallback: EventListenerOrEventListenerObject): void;
}
