import {Character} from './Character';

export class PartyMember{
  public include: boolean = true;
  public characterId: string;
  public character: Character;

  public enableAscension: boolean = true;
  public ascension: number = 0;

  public enableWeapon: boolean = false;
  public weaponId: string;
  public weaponAsc: number = 0;

  // TODO: Add talents
  public enableTalents: boolean = true;

  //TODO: Add talents
  public enableArtifacts: boolean = true;

  constructor(characterId: string) {
    this.characterId = characterId;
  }
}
