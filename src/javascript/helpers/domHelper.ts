import {CreateElement} from '../../types/index';

export function createElement({ tagName, className, attributes = {}}: CreateElement): HTMLElement {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key: string): void => element.setAttribute(key, attributes[key]));

  return element;
}
