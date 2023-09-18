import './levels.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';
import { ILevelView, btnCallback, itemCallback } from './interfaces';

const LEVELS_TAG_NAME = 'aside';
const LEVELS_CLASS_NAMES: string[] = ['levels'];

// container properties
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAMES: string[] = ['levels__container'];

// title properties
const TITLE_TAG = 'h2';
const TITLE_CLASS_NAMES: string[] = ['levels__title'];
const TITLE_TEXT_CONTENT = 'Level';

// level list properties
const LIST_TAG = 'ul';
const LIST_CLASS_NAMES: string[] = ['levels-list'];

//list items properties
const ITEM_TAG = 'li';
const ITEM_CLASS_NAMES: string[] = ['levels-list__item', 'item'];

const MARKER_TAG = 'span';
const MARKER_CLASS_NAMES: string[] = ['item__marker'];
const MARKER_TEXT_CONTENT = '✓';

const TEXT_TAG = 'span';
const TEXT_CLASS_NAMES: string[] = ['item__text'];

// level button properties
const BTN_TAG = 'button';
const BTN_CLASS_NAMES: string[] = ['reset-btn', 'btn'];
const BTN_ATTRIBUTES: Record<string, string> = { type: 'button' };
const BTN_TEXT_CONTENT = 'Reset Progress';

// levels number from => to
// TODO: add functionality of adding levels number according to dataStorage
const LEVELS_NUM_FROM = 1;
const LEVELS_NUM_TO = 10;
const CUSTOM_ITEM_ATTRIBUTE = 'data-levelID';

// classes to change item appearance
const ITEM_ACTIVE = 'item_active';
const ITEM_PASSED = 'item_passed';
const ITEM_HINTED = 'item_hinted';

export default class LevelsView extends View implements ILevelView {
  private levelItems: IElementCreator[] = [];
  private btn: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: LEVELS_TAG_NAME,
      classNames: LEVELS_CLASS_NAMES,
    };
    super(params);
    this.btn = this.createBtn();
    this.configureView();
  }

  public getLevelItems(): IElementCreator[] {
    return this.levelItems;
  }

  public getLevelItem(levelNum: number): IElementCreator | null {
    const result: IElementCreator | undefined = this.levelItems.find(
      (item: IElementCreator): boolean => item.getElement().getAttribute(CUSTOM_ITEM_ATTRIBUTE) === `${levelNum}`
    );
    return result ? result : null;
  }

  public cancelAllMarking(): void {
    this.levelItems.forEach((item: IElementCreator): void => {
      item.getElement().classList.remove(ITEM_ACTIVE, ITEM_PASSED, ITEM_HINTED);
    });
  }

  public markActiveItem(number: number): void {
    const item: IElementCreator | null = this.getLevelItem(number);
    if (item) item.getElement().classList.add(ITEM_ACTIVE);
  }

  public removeActiveMark(number: number) {
    const item: IElementCreator | null = this.getLevelItem(number);
    if (item) item.getElement().classList.remove(ITEM_ACTIVE);
  }

  public markPassedItems(numbers: number[]): void {
    numbers.forEach((number: number): void => {
      const item: IElementCreator | null = this.getLevelItem(number);
      if (item) {
        const classList: DOMTokenList = item.getElement().classList;
        classList.remove(ITEM_ACTIVE);
        classList.add(ITEM_PASSED);
      }
    });
  }

  public markHintedItems(numbers: number[]): void {
    numbers.forEach((number: number): void => {
      const item: IElementCreator | null = this.getLevelItem(number);
      if (item) {
        const classList: DOMTokenList = item.getElement().classList;
        classList.remove(ITEM_ACTIVE);
        classList.add(ITEM_HINTED);
      }
    });
  }

  public setCallbacks(itemCallback: itemCallback) {
    this.levelItems.forEach((item: IElementCreator): void => {
      item.setListeners([
        {
          event: 'click',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          callback: (event: Event) => {
            const itemID: string | null = item.getElement().getAttribute(CUSTOM_ITEM_ATTRIBUTE);
            if (itemID) {
              itemCallback(+itemID);
            }
          },
        },
      ]);
    });
  }

  public setBtnCallback(btnHandler: btnCallback): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.btn.setListeners([{ event: 'click', callback: (e: Event) => btnHandler() }]);
  }

  protected configureView(): void {
    const containerParams: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: CONTAINER_CLASS_NAMES,
    };
    const titleParams: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: TITLE_CLASS_NAMES,
      textContent: TITLE_TEXT_CONTENT,
    };
    const listParams: ElementCreatorParams = {
      tag: LIST_TAG,
      classNames: LIST_CLASS_NAMES,
    };
    const containerCreator: IElementCreator = new ElementCreator(containerParams);
    const titleCreator: IElementCreator = new ElementCreator(titleParams);
    const listCreator: IElementCreator = new ElementCreator(listParams);

    for (let i = LEVELS_NUM_FROM; i <= LEVELS_NUM_TO; i += 1) {
      const item: IElementCreator = this.createItem(i);
      this.levelItems.push(item);
    }

    listCreator.addInnerElement(...this.levelItems);
    containerCreator.addInnerElement(titleCreator, listCreator, this.btn);
    this.getViewCreator().addInnerElement(containerCreator);
  }

  private createBtn(): IElementCreator {
    const btnParams: ElementCreatorParams = {
      tag: BTN_TAG,
      classNames: BTN_CLASS_NAMES,
      attributes: BTN_ATTRIBUTES,
      textContent: BTN_TEXT_CONTENT,
    };
    return new ElementCreator(btnParams);
  }

  private createItem(levelNum: number): IElementCreator {
    const itemParams: ElementCreatorParams = {
      tag: ITEM_TAG,
      classNames: ITEM_CLASS_NAMES,
      attributes: { [CUSTOM_ITEM_ATTRIBUTE]: levelNum.toString() },
    };
    const markerParams: ElementCreatorParams = {
      tag: MARKER_TAG,
      classNames: MARKER_CLASS_NAMES,
      textContent: MARKER_TEXT_CONTENT,
    };
    const textParams: ElementCreatorParams = {
      tag: TEXT_TAG,
      classNames: TEXT_CLASS_NAMES,
      textContent: levelNum.toString(),
    };
    const itemCreator: IElementCreator = new ElementCreator(itemParams);
    const markerCreator: IElementCreator = new ElementCreator(markerParams);
    const textCreator: IElementCreator = new ElementCreator(textParams);

    itemCreator.addInnerElement(markerCreator, textCreator);
    return itemCreator;
  }
}
