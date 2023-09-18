import './taskDescription.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import ITaskDescription from './interfaces';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';

const TASK_DESCRIPTION_TAG_NAME = 'section';
const TASK_DESCRIPTION_CLASS_NAMES: string[] = ['task-description'];

// description params
const DESCRIPTION_TAG = 'h2';
const DESCRIPTION_CLASS_NAMES: string[] = ['description'];
const DESCRIPTION_DEFAULT_TEXT_CONTENT = 'Task description is posted here!';

// button params
const BTN_TAG = 'button';
const BTN_CLASS_NAMES: string[] = ['btn', 'help-btn'];
const BTN_ATTRIBUTES: Record<string, string> = { type: 'button' };
const BTN_TEXT_CONTENT = "Help, I'm stuck!";

export default class TaskDescriptionView extends View implements ITaskDescription {
  private description: IElementCreator;
  private btn: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: TASK_DESCRIPTION_TAG_NAME,
      classNames: TASK_DESCRIPTION_CLASS_NAMES,
    };
    super(params);
    this.description = this.createDescriptionElement();
    this.btn = this.createBtnElement();
    this.configureView();
  }

  public getBtn(): IElementCreator {
    return this.btn;
  }

  public changeDescription(content: string): void {
    this.description.setTextContent(content);
  }

  public setBtnHandler(btnCallback: EventListenerOrEventListenerObject): void {
    this.btn.setListeners([{ event: 'click', callback: btnCallback }]);
  }

  protected configureView(): void {
    this.getViewCreator().addInnerElement(this.description, this.btn);
  }

  private createDescriptionElement(): IElementCreator {
    const descriptionParams: ElementCreatorParams = {
      tag: DESCRIPTION_TAG,
      classNames: DESCRIPTION_CLASS_NAMES,
      textContent: DESCRIPTION_DEFAULT_TEXT_CONTENT,
    };
    return new ElementCreator(descriptionParams);
  }

  private createBtnElement(): IElementCreator {
    const btnParams: ElementCreatorParams = {
      tag: BTN_TAG,
      classNames: BTN_CLASS_NAMES,
      attributes: BTN_ATTRIBUTES,
      textContent: BTN_TEXT_CONTENT,
    };
    return new ElementCreator(btnParams);
  }
}
