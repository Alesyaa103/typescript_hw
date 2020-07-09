import { IAttributes } from '../interfaces/index';

export type Fighter = { 
  _id?: string, 
  name?: string, 
  source?: string, 
  health?: number, 
  attack?: number, 
  defense?: number 
};

export type CreateElement = {
  tagName: string,
  className?: string,
  attributes?: IAttributes
}

export type Modal  = {
  title: string,
  bodyElement: HTMLElement,
  onClose: ()=> void
}

export type FighterCredentials = {
  fighter: Fighter,
  healthProgress: HTMLElement,
  currentHealth: number,
  isAttacking: boolean,
  isBlocking: boolean,
  baseHealth: number
}
