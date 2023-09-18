import './display.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';
import IDisplayView from './interfaces';

const DISPLAY_TAG_NAME = 'section';
const DISPLAY_CLASS_NAMES: string[] = ['display'];
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAMES: string[] = ['container', 'display__container'];
const TABLE_TAG = 'div';
const TABLE_CLASS_NAMES: string[] = ['table'];
const TABLE_BAR_TAG = 'div';
const TABLE_BAR_CLASS_NAMES: string[] = ['table__bar'];
const TABLE_EDGE_TAG = 'div';
const TABLE_EDGE_CLASS_NAMES: string[] = ['table__edge'];
const TABLE_LEFT_LEG_TAG = 'div';
const TABLE_LEFT_LEG_CLASS_NAMES: string[] = ['table__left-leg'];
const TABLE_RIGHT_LEG_TAG = 'div';
const TABLE_RIGHT_LEG_CLASS_NAMES: string[] = ['table__right-leg'];

export default class DisplayView extends View implements IDisplayView {
  private tableBar: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: DISPLAY_TAG_NAME,
      classNames: DISPLAY_CLASS_NAMES,
    };
    super(params);
    this.tableBar = this.createTableBar();
    this.configureView();
  }

  public getTableBar(): IElementCreator {
    return this.tableBar;
  }

  public addItems(...items: (HTMLElement | IElementCreator)[]): void {
    items.forEach((item: HTMLElement | IElementCreator): void => {
      this.tableBar.addInnerElement(item);
    });
  }

  public addInnerHTML(html: string): void {
    this.tableBar.getElement().innerHTML = html;
  }

  protected configureView(): void {
    const containerParams: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: CONTAINER_CLASS_NAMES,
    };
    const containerCreator: IElementCreator = new ElementCreator(containerParams);

    const tableParams: ElementCreatorParams = {
      tag: TABLE_TAG,
      classNames: TABLE_CLASS_NAMES,
    };
    const tableCreator: IElementCreator = new ElementCreator(tableParams);

    const tableEdgeParams: ElementCreatorParams = {
      tag: TABLE_EDGE_TAG,
      classNames: TABLE_EDGE_CLASS_NAMES,
    };
    const tableEdgeCreator: IElementCreator = new ElementCreator(tableEdgeParams);

    const tableLeftLegParams: ElementCreatorParams = {
      tag: TABLE_LEFT_LEG_TAG,
      classNames: TABLE_LEFT_LEG_CLASS_NAMES,
    };
    const tableLeftLegCreator: IElementCreator = new ElementCreator(tableLeftLegParams);

    const tableRightLegParams: ElementCreatorParams = {
      tag: TABLE_RIGHT_LEG_TAG,
      classNames: TABLE_RIGHT_LEG_CLASS_NAMES,
    };
    const tableRightLegCreator: IElementCreator = new ElementCreator(tableRightLegParams);

    tableCreator.addInnerElement(this.tableBar, tableEdgeCreator, tableLeftLegCreator, tableRightLegCreator);
    containerCreator.addInnerElement(tableCreator);
    this.getViewCreator().addInnerElement(containerCreator);
  }

  private createTableBar(): IElementCreator {
    const tableBarParams: ElementCreatorParams = {
      tag: TABLE_BAR_TAG,
      classNames: TABLE_BAR_CLASS_NAMES,
    };
    return new ElementCreator(tableBarParams);
  }
}
