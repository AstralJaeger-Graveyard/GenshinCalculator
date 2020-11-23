import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import * as cData from 'src/app/_dataassets/characters.json';
import * as data from 'src/app/_dataassets/data.json';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  // @ts-ignore
  public characters: Character[] = data.characters;
  private characterMap: Map<string, Character> = new Map<string, Character>();

  constructor() { }

  public get getCharacterMap(){
    if(this.characterMap.size === 0){
      for(let character of this.characters){
        this.characterMap.set(character.name.toLowerCase(), character);
      }
    }
    return this.characterMap
  }
}
