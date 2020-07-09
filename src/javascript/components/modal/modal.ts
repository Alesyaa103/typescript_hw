import { createElement } from '../../helpers/domHelper';
import { Modal } from '../../../types/index';

export function showModal({ title, bodyElement, onClose = () => {} }: Modal): void {
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement, onClose }); 
  
  root.append(modal);
}

function getModalContainer(): HTMLElement {
  return document.getElementById('root');
}

function createModal({ title, bodyElement, onClose }: Modal): HTMLElement {
  const layer = createElement({ tagName: 'div', className: 'modal-layer' });
  const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
  const header = createHeader(title, onClose);

  modalContainer.append(header, bodyElement);
  layer.append(modalContainer);

  return layer;
}

function createHeader(title: string, onClose: () => void): HTMLElement {
  const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({ tagName: 'div', className: 'close-btn' });
  
  titleElement.innerText = title;
  closeButton.innerText = '×';
  
  const close = () => {
    hideModal();
    onClose();
  }
  closeButton.addEventListener('click', close);
  headerElement.append(title, closeButton);
  
  return headerElement;
}

function hideModal(): void {
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal.remove();
}
