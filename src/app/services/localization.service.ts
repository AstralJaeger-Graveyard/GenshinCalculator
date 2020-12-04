import { Injectable } from '@angular/core';
// @ts-ignore
import * as data from 'src/app/_dataassets/translations.en-US.json';
import {Translation} from '../model/Translation';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  public translations: Translation[] = data.translations;
  public translationsMap: Map<string, Translation> =
    new Map<string, Translation>();

  constructor() {
    for(let translation of this.translations){
      this.translationsMap.set(translation.id, translation);
    }
  }

  public get(id:string): Translation{
    return this.translationsMap.get(id);
  }
}
