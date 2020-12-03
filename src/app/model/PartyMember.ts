import {Character} from './Character';
import {Weapon} from './Weapon';

export class PartyMember{
  public include: boolean = true;
  public character_id: string;
  public character: Character;

  public enable_ascension: boolean;
  public ascension: number = 0;

  public enable_level: boolean;
  public level: number = 1;

  public enable_weapon: boolean;
  public weapon_id: string;
  public weapon: Weapon;
  public weaponAsc: number = 0;
  public weaponLvl: number = 1;

  //TODO: Add artifacts, talents

  constructor() { }
}
