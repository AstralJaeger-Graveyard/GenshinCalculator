import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<Character[]>{
    return this.http.get(this.dataUrl).pipe(map<any, Character[]>(data => data as Character[]));
  }

  public getCharacterMap(obs: Observable<Character[]> ): Observable<Map<string, Character>> {
     return obs.pipe(map(data => {
       const characters = new Map<string, Character>();
       for (const character of data){
         characters.set(character.name, character);
       }
       return characters;
     }));
  }
}
