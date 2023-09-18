import './common.scss';
import CustomStorageHandler from './data/customStorage/customStorageHanlder';
import { ICustomStorageHandler } from './data/customStorage/types';
import LocalStorageHandler from './data/localStorage/localStorageHandler';
import { ILocalStorageHandler } from './data/localStorage/types';
import { IApp } from './interface';
import Controller from './logic/controller';
import { ControllerParams, IController } from './logic/types';
import ElementCreator from './util/elementCreator/elementCreator';
import { ElementCreatorParams } from './util/elementCreator/interfaces';
import DisplayView from './view/display/displayView';
import EditorView from './view/editors/editorView';
import FooterView from './view/footer/footerView';
import HeaderView from './view/header/headerView';
import LevelsView from './view/levels/levelsView';
import TaskDescriptionView from './view/taskDescription/taskDescriptionView';
import { display, editors, levels, taskDescription } from './view/types';
import IView from './view/view/interfaces';

// container properties
const WRAPPER_TAG = 'div';
const WRAPPER_CLASS_NAMES: string[] = ['wrapper'];

export default class App implements IApp {
  private static readonly instance = new App();

  private readonly displayView: display;
  private readonly editorsView: editors;
  private readonly levelsView: levels;
  private readonly taskDescriptionView: taskDescription;
  private readonly localStorageHandler: ILocalStorageHandler;
  private readonly customStorageHandler: ICustomStorageHandler;
  private readonly controller: IController;

  private constructor() {
    this.displayView = new DisplayView();
    this.editorsView = new EditorView();
    this.levelsView = new LevelsView();
    this.taskDescriptionView = new TaskDescriptionView();
    this.localStorageHandler = LocalStorageHandler.getInstance();
    this.customStorageHandler = CustomStorageHandler.getInstance();

    const params: ControllerParams = {
      localStorageHandler: this.localStorageHandler,
      customStorageHandler: this.customStorageHandler,
      description: this.taskDescriptionView,
      display: this.displayView,
      levels: this.levelsView,
      cssEditor: this.editorsView.getCssEditor(),
      htmlEditor: this.editorsView.getHtmlEditor(),
      editors: this.editorsView,
    };
    this.controller = new Controller(params);
  }

  public static getInstance() {
    return this.instance;
  }

  public start(): void {
    this.createBasicView();
    this.controller.startRendering();
    this.levelsView.setCallbacks(this.controller.choseLevel.bind(this.controller));
    this.taskDescriptionView.setBtnHandler(this.controller.helpBtnLogic.bind(this.controller));
    this.editorsView.getCssEditor().setSelectorInputHandler(this.controller.inputLogic.bind(this.controller));
    this.levelsView.setBtnCallback(this.controller.resetBtnLogic.bind(this.controller));
  }

  private createBasicView() {
    const wrapperParams: ElementCreatorParams = {
      tag: WRAPPER_TAG,
      classNames: WRAPPER_CLASS_NAMES,
    };
    const wrapperCreator: ElementCreator = new ElementCreator(wrapperParams);
    const header: IView = new HeaderView();
    const footer: IView = new FooterView();

    wrapperCreator.addInnerElement(
      header.getView(),
      this.taskDescriptionView.getView(),
      this.displayView.getView(),
      this.editorsView.getView(),
      this.levelsView.getView(),
      footer.getView()
    );
    document.body.append(wrapperCreator.getElement());
  }
}
