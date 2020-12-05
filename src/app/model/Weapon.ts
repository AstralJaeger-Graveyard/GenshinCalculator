import {Stat} from './Stat';
import {WeaponType} from './WeaponType';
import {MaterialEntry} from "./MaterialEntry";

export class Weapon{

  public id: string;
  public weaponType: WeaponType;
  public icon: string;
  public rarity: number;
  public atk: number;
  public secondary: Stat;
  public passive: string;
  public ascension: MaterialEntry[];
}
