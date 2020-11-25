import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import {MaterialService} from './material.service';
import * as data from 'src/app/_dataassets/data_0.json';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  // @ts-ignore
  public characters: Character[] = data.characters;
  private characterMap: Map<string, Character> = new Map<string, Character>();

  constructor(private materialService: MaterialService) {
    for (let character of this.characters){
      materialService.resolveMaterials(character);
    }
  }

  public get getCharacterMap(){
    if(this.characterMap.size === 0){
      for(let character of this.characters){
        this.characterMap.set(character.name.toLowerCase(), character);
      }
    }
    return this.characterMap
  }
}
