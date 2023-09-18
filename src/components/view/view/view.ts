import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';
import IView from './interfaces';

export default abstract class View implements IView {
  private viewElementCreator: IElementCreator;
  private viewElement: HTMLElement;

  public constructor(params: ElementCreatorParams) {
    this.viewElementCreator = new ElementCreator(params);
    this.viewElement = this.viewElementCreator.getElement();
  }

  public getView(): HTMLElement {
    return this.viewElement;
  }

  public getViewCreator(): IElementCreator {
    return this.viewElementCreator;
  }

  protected abstract configureView(): void;
}
