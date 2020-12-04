import {Injectable, isDevMode} from '@angular/core';
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
    for (const translation of this.translations){
      this.translationsMap.set(translation.id, translation);
    }
  }

  public get(id: string): Translation{
    if (isDevMode() && !this.translationsMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;')
    }
    return this.translationsMap.get(id);
  }
}
