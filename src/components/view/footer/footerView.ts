import './footer.scss';
import View from '../view/view';
import ElementCreator from '../../util/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '../../util/elementCreator/interfaces';

const FOOTER_TAG_NAME = 'footer';
const FOOTER_CLASS_NAMES: string[] = ['footer'];

// container properties
const CONTAINER_TAG = 'div';
const CONTAINER_CLASS_NAMES: string[] = ['container', 'footer__container'];

// Github link properties
const GITHUB_LINK_TAG = 'a';
const GITHUB_LINK_CLASS_NAMES: string[] = ['github'];
const GITHUB_LINK_ATTRIBUTES: Record<string, string> = {
  href: 'https://github.com/LeanidRymkevich',
  target: '_blank',
};

const GITHUB_IMG_TAG = 'img';
const GITHUB_IMG_CLASS_NAMES: string[] = ['github__logo'];
const GITHUB_IMG_ATTRIBUTES: Record<string, string> = {
  src: './assets/svg/github.svg',
  alt: 'github-logo',
};

const GITHUB_USER_TAG = 'span';
const GITHUB_USER_CLASS_NAMES: string[] = ['github__user'];
const GITHUB_USER_TEXT_CONTENT = 'Leanid Rymkevich';

// year content
const YEAR_TAG = 'span';
const YEAR_CLASS_NAMES: string[] = ['year'];
const YEAR_TEXT_CONTENT = '2023';

// rss link properties
const RSS_LINK_TAG = 'a';
const RSS_LINK_CLASS_NAMES: string[] = ['rss-link'];
const RSS_LINK_ATTRIBUTES: Record<string, string> = {
  href: 'https://rs.school/js/',
  target: '_blank',
};

const RSS_IMG_TAG = 'img';
const RSS_IMG_CLASS_NAMES: string[] = ['rss-link__logo'];
const RSS_IMG_ATTRIBUTES: Record<string, string> = {
  src: './assets/svg/rs-school.svg',
  alt: 'rss-logo',
};

export default class FooterView extends View {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: FOOTER_TAG_NAME,
      classNames: FOOTER_CLASS_NAMES,
    };
    super(params);
    this.configureView();
  }

  protected configureView(): void {
    const containerParams: ElementCreatorParams = {
      tag: CONTAINER_TAG,
      classNames: CONTAINER_CLASS_NAMES,
    };
    const yearParams: ElementCreatorParams = {
      tag: YEAR_TAG,
      classNames: YEAR_CLASS_NAMES,
      textContent: YEAR_TEXT_CONTENT,
    };
    const containerCreator: IElementCreator = new ElementCreator(containerParams);
    const githubLink: IElementCreator = this.createGithubLink();
    const yearCreator: IElementCreator = new ElementCreator(yearParams);
    const rssLink: IElementCreator = this.createRSSLink();

    containerCreator.addInnerElement(githubLink, yearCreator, rssLink);
    this.getViewCreator().addInnerElement(containerCreator);
  }

  private createRSSLink(): IElementCreator {
    const linkParams: ElementCreatorParams = {
      tag: RSS_LINK_TAG,
      classNames: RSS_LINK_CLASS_NAMES,
      attributes: RSS_LINK_ATTRIBUTES,
    };
    const linkCreator: IElementCreator = new ElementCreator(linkParams);

    const imgParams: ElementCreatorParams = {
      tag: RSS_IMG_TAG,
      classNames: RSS_IMG_CLASS_NAMES,
      attributes: RSS_IMG_ATTRIBUTES,
    };
    const imgCreator: IElementCreator = new ElementCreator(imgParams);

    linkCreator.addInnerElement(imgCreator);

    return linkCreator;
  }

  private createGithubLink(): IElementCreator {
    const linkParams: ElementCreatorParams = {
      tag: GITHUB_LINK_TAG,
      classNames: GITHUB_LINK_CLASS_NAMES,
      attributes: GITHUB_LINK_ATTRIBUTES,
    };
    const linkCreator: IElementCreator = new ElementCreator(linkParams);

    const imgParams: ElementCreatorParams = {
      tag: GITHUB_IMG_TAG,
      classNames: GITHUB_IMG_CLASS_NAMES,
      attributes: GITHUB_IMG_ATTRIBUTES,
    };
    const imgCreator: IElementCreator = new ElementCreator(imgParams);

    const userParams: ElementCreatorParams = {
      tag: GITHUB_USER_TAG,
      classNames: GITHUB_USER_CLASS_NAMES,
      textContent: GITHUB_USER_TEXT_CONTENT,
    };
    const userCreator: IElementCreator = new ElementCreator(userParams);

    linkCreator.addInnerElement(imgCreator, userCreator);

    return linkCreator;
  }
}
