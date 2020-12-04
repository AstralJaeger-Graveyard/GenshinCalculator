import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import {MaterialService} from './material.service';
import * as data from 'src/app/_dataassets/characters_2.json';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  // @ts-ignore
  public characters: Character[] = data.characters;
  public characterMap: Map<string, Character> = new Map<string, Character>();

  constructor(private materialService: MaterialService) {

    // Resolve materials
    for (let character of this.characters){
      materialService.resolveMaterials(character);
    }

    // Build map with characters for easy access via key
    for(let character of this.characters){
      this.characterMap.set(character.id, character);
    }
  }

  public get(id: string): Character{
    return this.characterMap.get(id);
  }
}
