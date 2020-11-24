import { Injectable } from '@angular/core';
import { Character } from '../model/Character';
import {Material} from '../model/Material';
import * as data from 'src/app/_dataassets/data_1.json';

@Injectable({
  providedIn: 'root'
})
export class MaterialService{

  // @ts-ignore
  public materials: Material[] = data.materials;
  private materialsMap: Map<string, Material> = new Map<string, Material>();

  constructor() { }

  public get getMaterialsMap(){
    if(this.materialsMap.size === 0){
      for(let material of this.materials){
        this.materialsMap.set(material.id, material);
      }
    }
    return this.materialsMap
  }

  public resolveMaterials(character: Character): void{
    for (let mset of character.ascension){
      for (let material of mset.materials){
        console.log("Infilling: " + character.name + " Material: " + material.material_id);
        material.material = this.getMaterialsMap.get(material.material_id);
      }
    }
  }
}
