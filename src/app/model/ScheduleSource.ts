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
}
