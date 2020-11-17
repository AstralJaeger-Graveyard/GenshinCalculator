import { Element } from './Element';
import { WeaponType } from './WeaponType';

export class Character{
  public name: string;
  public description: string;
  public element: Element;
  public weaponType: WeaponType;
  public rarity: number;
  public tier: string;
  public portrait: string;
  public icon: string;
  public isNew: boolean = false;
  // TODO: Upgrade materials, talent materials

  constructor(name: string, description: string, element: Element, rarity: number, tier: string) {
    this.name = name;
    this.description = description;
    this.element = element;
    this.rarity = rarity;
    this.tier = tier;
  }
}
