import { Fighter } from '../types/index';

export interface IApp {
  rootElement?: HTMLElement,
  loadingElement?: HTMLElement,
  startApp: () => Promise<any>
}

export interface IFighterService {
  getFighters: () => Promise<Fighter[]>,
  getFighterDetails: (id: string) => Promise<Fighter>
}

export interface IAttributes {
  [index: string]: string;
}

export interface IInfo {
  [index: string]: string | number;
}