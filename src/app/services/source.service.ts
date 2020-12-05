import {Injectable, isDevMode} from '@angular/core';
import { Character } from '../model/Character';
import {MaterialSource} from "../model/MaterialSource";
// @ts-ignore
import * as data from 'src/app/_dataassets/sources.json';

@Injectable({
  providedIn: 'root'
})
export class SourceService{

  // @ts-ignore
  public sources: MaterialSource[] = data.characters;
  public sourcesMap: Map<string, MaterialSource> = new Map<string, MaterialSource>();

  constructor() {

    // Build map with characters for easy access via key
    for (const source of this.sources){
      this.sourcesMap.set(source.id, source);
    }
  }

  public get(id: string): MaterialSource{
    if (isDevMode() && !this.sourcesMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;')
    }
    return this.sourcesMap.get(id);
  }
}
