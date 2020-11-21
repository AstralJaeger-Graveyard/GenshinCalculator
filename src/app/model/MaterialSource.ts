import {Day} from './Day';

export class MaterialSource{

  public name: string;
  public description: string;
  public isDomain: boolean = false;
  public location: string;
  public available: Day[] = [];
  public cost: number;
}
