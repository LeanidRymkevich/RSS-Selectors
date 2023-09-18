export interface ElementCreatorParams {
  tag: string;
  classNames?: string[];
  attributes?: Record<string, string>;
  textContent?: string;
  listenersParams?: listenerParam[];
}

export interface listenerParam {
  event: string;
  callback: EventListenerOrEventListenerObject;
}

export interface IElementCreator {
  getElement(): HTMLElement;
  addInnerElement(...elements: (HTMLElement | IElementCreator)[]): void;
  setClasses(classNames: string[] | undefined): void;
  setAttributes(attributes: Record<string, string> | undefined): void;
  setTextContent(textContent: string | undefined): void;
  setListeners(listenersParams: listenerParam[] | undefined): void;
}
