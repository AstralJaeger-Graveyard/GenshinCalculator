import {Material} from './Material';

export class MaterialEntry{
  public material_id: string;
  public material: Material;
  public amount: number;

  constructor(material_id: string, material: Material, amount: number) {
    this.material_id = material_id;
    this.material = material;
    this.amount = amount;
  }
}
