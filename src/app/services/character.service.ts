import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as  cData from 'src/app/_dataassets/characters.json';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private dataUrl = 'assets/characters.json';

  // @ts-ignore
  public characters: Character[] = cData.default;

  public characterMap: Map<string, Character> = new Map<string, Character>();

  constructor() {
    this.characters.forEach(character => {
      this.characterMap.set(character.name.toLowerCase(), character)
    });
  }
}
