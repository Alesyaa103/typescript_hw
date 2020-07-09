import { createElement } from '../helpers/domHelper';
import { Fighter } from '../../types/index';
import { IInfo } from '../../interfaces/index';

export function createFighterPreview(fighter: Fighter, position: 'left' | 'right'): HTMLElement {
  const positionClassName: string = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if (fighter) {
    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.appendChild(createFighterInfo(fighter));
  }
  return fighterElement;
}

export function createFighterImage(fighter: Fighter): HTMLElement {
  const { source, name } = fighter;
  const attributes = { src: source, alt: name, };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

function createFighterInfo(fighter: Fighter): HTMLElement {
  const data: IInfo = {
    name: fighter.name,
    health: fighter.health,
    attack: fighter.attack,
    defense: fighter.defense,
  }
  const features = createElement({
    tagName: 'ul',
    className: 'feature-block'
  });

  for (let key in data) {
    const feature = createElement({
      tagName: 'li',
      className: 'feature-block__item'
    })
    const featureName = createElement({
      tagName: 'span',
    })
    const featureValue = createElement({
      tagName: 'span'
    })
    featureName.innerText = key;
    featureValue.innerText = `${data[key]}`;
    feature.appendChild(featureName);
    feature.appendChild(featureValue);
    features.appendChild(feature);
  }
  
  return features
}