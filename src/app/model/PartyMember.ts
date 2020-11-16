import {Character} from './Character';

export class PartyCharacter{
  public character: Character;
  public level: number;
  public ascension: number;

  //TODO: Add weapton, artifacts, talents

  constructor(character: Character, level: number, ascension: number) {
    this.character = character;
    this.level = level;
    this.ascension = ascension;
  }

}
