import {Injectable, isDevMode} from '@angular/core';
import { Character } from '../model/Character';
import {MaterialService} from './material.service';
import * as data from 'src/app/_dataassets/characters.json';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  // @ts-ignore
  public characters: Character[] = data.characters;
  public characterMap: Map<string, Character> = new Map<string, Character>();

  constructor() {
    // Build map with characters for easy access via key
    for (const character of this.characters){
      this.characterMap.set(character.id, character);
    }
  }

  public get(id: string): Character{
    if (isDevMode() && !this.characterMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;')
    }
    return this.characterMap.get(id);
  }
}
