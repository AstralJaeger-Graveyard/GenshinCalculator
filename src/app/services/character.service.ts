import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import * as cData from 'src/app/_dataassets/characters.json';
import * as data from 'src/app/_dataassets/data.json';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  // @ts-ignore
  private _characters: Character[] = cData.default;
  private _characterMap: Map<string, Character> = new Map<string, Character>();

  constructor() {

  }

  public get characters(){
    return this._characters;
  }

  public get characterMap(){
    if(this._characterMap.size === 0){
      for(let character of this._characters){
        this._characterMap.set(character.name.toLowerCase(), character);
      }
    }
    return this._characterMap
  }
}
