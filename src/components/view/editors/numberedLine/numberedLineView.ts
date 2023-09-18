import './numberedLine.scss';
import View from '../../view/view';
import ElementCreator from '../../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../../util/elementCreator/interfaces';
import INumberedLineView from './interfaces';

const NUMBERED_LINE_TAG = 'div';
const NUMBERED_LINE_CLASS_NAMES: string[] = ['numbered-line'];
const NUMBER_TAG = 'span';
const LINE_START_NUM = 1;
const LINE_END_NUM = 15;

export default class NumberedLineView extends View implements INumberedLineView {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: NUMBERED_LINE_TAG,
      classNames: NUMBERED_LINE_CLASS_NAMES,
    };
    super(params);
    this.configureView();
  }

  public setLineClasses(classes: string[]): void {
    this.getViewCreator().setClasses(classes);
  }

  protected configureView(): void {
    for (let i = LINE_START_NUM; i <= LINE_END_NUM; i += 1) {
      const numberParams: ElementCreatorParams = {
        tag: NUMBER_TAG,
        textContent: i.toString(),
      };
      const numberCreator: IElementCreator = new ElementCreator(numberParams);
      this.getViewCreator().addInnerElement(numberCreator);
    }
  }
}
