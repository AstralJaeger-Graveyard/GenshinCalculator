import {Injectable, isDevMode} from '@angular/core';
import { Weapon } from '../model/Weapon';
import { WeaponType } from '../model/WeaponType';
import * as data from 'src/app/_dataassets/weapons.json';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  // @ts-ignore
  public weapons: Weapon[] = data.weapons;
  public weaponsMap: Map<string, Weapon> = new Map<string, Weapon>();
  public sortedMap: Map<string, Map<string, Weapon>> = new Map<string, Map<string, Weapon>>();

  constructor() {
    this.weaponsMap = WeaponService.genWeaponsMap(this.weaponsMap, this.weapons);
    for (const weaponType of Object.keys(WeaponType)){
      const subMap = new Map<string, Weapon>();
      this.weapons
        .filter(weapon => weapon.weaponType === weaponType)
        .forEach(weapon => subMap.set(weapon.id, weapon));
      const sortedSubMap = new Map([...subMap].sort((a, b) => b[1].rarity - a[1].rarity));
      this.sortedMap.set(weaponType.toLowerCase(), sortedSubMap);
    }
    console.dir(this.sortedMap);
  }

  private static genWeaponsMap(map: Map<string, Weapon>, source: Weapon[]): Map<string, Weapon>{
    for (const weapon of source) {
      map.set(weapon.id, weapon);
    }
    return map;
  }

  public get(id: string): Weapon{
    if (isDevMode() && !this.weaponsMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;');
    }
    return this.weaponsMap.get(id);
  }

  public getMap(weaponType: WeaponType): Map<string, Weapon>{
    if (isDevMode() && !this.sortedMap.has(weaponType)){
      console.log('%c Could not find item with id: ' + weaponType, 'color: red; font-size: 20px;');
    }
    return this.sortedMap.get(weaponType);
  }
}
