import {Day} from './Day';

export class MaterialSource{

  public id: string;
  public name: string;
  public isSuperSource: boolean = false;
  public superSource: string;
  public isIgnoreSource: boolean = false;
  public description: string;
  public isDomain: boolean = false;
  public location: string;
  public isRestrictedSource: boolean = false
  public available: Day[] = [];
  public cost: number;
}
