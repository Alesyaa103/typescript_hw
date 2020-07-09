import { showModal } from './modal'
import { createElement } from "../../helpers/domHelper";
import { createFighterImage} from "../fighterPreview";
import { Fighter } from '../../../types/index';

export function showWinnerModal(fighter: Fighter): void {

  const bodyElement = createElement({
    tagName: "div",
    className: "modal-body"
  });

  const fighterImg = createFighterImage(fighter);

  bodyElement.append(fighterImg)

  showModal({
    title: `The Winner of this epic fight: ${fighter.name}`,
    bodyElement,
    onClose
  });
}

function onClose(): void {
  window.location.reload()
};