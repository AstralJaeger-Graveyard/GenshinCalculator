import {Character} from './Character';

export class PartyMember{
  public include: boolean = true;
  public character_id: string;
  public character: Character;

  public enable_ascension: boolean = true;
  public ascension: number = 0;

  public enable_weapon: boolean = false;
  public weapon_id: string;
  public weaponAsc: number = 0;

  // TODO: Add talents
  public enable_talents: boolean = true;

  //TODO: Add talents
  public enable_artifacts: boolean = true;

  constructor(characterId: string) {
    this.character_id = characterId;
  }
}
