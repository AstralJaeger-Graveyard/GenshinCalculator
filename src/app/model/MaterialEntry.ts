import {Material} from './Material';

export class MaterialEntry{
  public materialId: string;
  public amount: number;

  constructor(material_id: string, amount: number) {
    this.materialId = material_id;
    this.amount = amount;
  }
}
