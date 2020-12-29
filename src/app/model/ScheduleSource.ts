import {MaterialSource} from './MaterialSource';
import {Character} from './Character';

export class ScheduleSource {
  public source: MaterialSource;
  public materials: Map<string, Character[]>;
  public amounts: Map<string, number>;

  constructor(source: MaterialSource, materials: Map<string, Character[]>, amounts: Map<string, number>) {
    this.source = source;
    this.materials = materials;
    this.amounts = amounts;
  }

  public addMaterial(id: string, character: Character, amount: number){
    if(!this.materials.has(id)){
      this.materials.set(id, [character]);
      this.amounts.set(id, +amount);
    }
    else {
      if (this.materials.get(id).filter(c => c.id === character.id).length === 0){
        this.materials.get(id).push(character);
      }
      this.amounts.set(id, +this.amounts.get(id) + +amount);
    }
  }
}
