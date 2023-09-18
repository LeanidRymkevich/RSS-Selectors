import './editorHeader.scss';
import View from '../../view/view';
import ElementCreator from '../../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../../util/elementCreator/interfaces';
import { HeaderParams, IEditorHeaderView } from './interfaces';

const HEADER_TAG = 'div';
const HEADER_CLASS_NAMES: string[] = ['editor__header'];
const TITLE_TAG = 'span';
const TITLE_CLASS_NAMES: string[] = ['editor__title'];
const FILE_NAME_TAG = 'span';
const FILE_NAME_NAMES: string[] = ['editor__file-name'];

export default class EditorHeaderView extends View implements IEditorHeaderView {
  private title: IElementCreator | null = null;
  private fileName: IElementCreator | null = null;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: HEADER_TAG,
      classNames: HEADER_CLASS_NAMES,
    };
    super(params);
    this.configureView();
  }

  public createHeader(params: HeaderParams): IElementCreator {
    this.getViewCreator().setClasses(params.headerClasses);
    this.title?.setClasses(params.titleClasses);
    this.fileName?.setClasses(params.fileNameClasses);
    this.title?.setTextContent(params.titleText);
    this.fileName?.setTextContent(params.fileNameText);

    return this.getViewCreator();
  }

  protected configureView(): void {
    const titleParams: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: TITLE_CLASS_NAMES,
    };
    this.title = new ElementCreator(titleParams);

    const fileNameParams: ElementCreatorParams = {
      tag: FILE_NAME_TAG,
      classNames: FILE_NAME_NAMES,
    };
    this.fileName = new ElementCreator(fileNameParams);

    this.getViewCreator().addInnerElement(this.title, this.fileName);
  }
}
