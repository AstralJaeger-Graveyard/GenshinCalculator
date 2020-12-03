import { Element } from './Element';
import { WeaponType } from './WeaponType';
import {MaterialEntry} from './MaterialEntry';
import {MaterialSet} from './MaterialSet';

export class Character {
  public id: string;
  public element: Element;
  public weaponType: WeaponType;
  public rarity: number;
  public tier: string;
  public portrait: string;
  public card: string;
  public icon: string;
  public isNew: boolean = false;
  public ascension: MaterialSet[];
  // TODO: talent materials

  constructor() { }
}
