import './header.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';

const HEADER_TAG_NAME = 'header';
const HEADER_CLASS_NAMES: string[] = ['header'];

// container properties
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAMES: string[] = ['container', 'header__container'];

// title properties
const TITLE_TAG = 'h1';
const TITLE_CLASS_NAMES: string[] = ['title'];
const TITLE_IMG_TAG = 'span';
const TITLE_IMG_CLASS_NAMES: string[] = ['title__img'];
const TITLE_TEXT_TAG = 'span';
const TITLE_TEXT_CLASS_NAMES: string[] = ['title__text'];
const TITLE_TEXT_TEXT_CONTENT = 'RSS-CSS-SELECTORS';

export default class HeaderView extends View {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: HEADER_TAG_NAME,
      classNames: HEADER_CLASS_NAMES,
    };
    super(params);
    this.configureView();
  }

  protected configureView(): void {
    const containerParams: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: CONTAINER_CLASS_NAMES,
    };
    const containerCreator: IElementCreator = new ElementCreator(containerParams);

    const titleParams: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: TITLE_CLASS_NAMES,
    };
    const titleCreator: IElementCreator = new ElementCreator(titleParams);

    const titleImgParams: ElementCreatorParams = {
      tag: TITLE_IMG_TAG,
      classNames: TITLE_IMG_CLASS_NAMES,
    };
    const titleImgCreator: IElementCreator = new ElementCreator(titleImgParams);

    const titleTextParams: ElementCreatorParams = {
      tag: TITLE_TEXT_TAG,
      classNames: TITLE_TEXT_CLASS_NAMES,
      textContent: TITLE_TEXT_TEXT_CONTENT,
    };
    const titleTextCreator: IElementCreator = new ElementCreator(titleTextParams);

    titleCreator.addInnerElement(titleImgCreator, titleTextCreator);
    containerCreator.addInnerElement(titleCreator);
    this.getViewCreator().addInnerElement(containerCreator);
  }
}
