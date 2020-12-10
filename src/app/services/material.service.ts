import {Injectable, isDevMode} from '@angular/core';
import { Character } from '../model/Character';
import {Material} from '../model/Material';
import * as data from 'src/app/_dataassets/materials.json';

@Injectable({
  providedIn: 'root'
})
export class MaterialService{

  // @ts-ignore
  public materials: Material[] = data.materials;
  public materialsMap: Map<string, Material> = new Map<string, Material>();

  constructor() {
    for (const material of this.materials){
      this.materialsMap.set(material.id, material);
    }
  }

  public get(id: string): Material{
    if (isDevMode() && !this.materialsMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;')
    }
    return this.materialsMap.get(id);
  }
}
