import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PartyService} from '../services/party.service';
import {MaterialEntry} from '../model/MaterialEntry';
import {PartyMember} from '../model/PartyMember';
import {MaterialService} from '../services/material.service';
import {LocalizationService} from '../services/localization.service';
import {CharacterService} from '../services/character.service';
import {WeaponService} from '../services/weapon.service';
import {Weapon} from '../model/Weapon';
import {Character} from '../model/Character';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {

  private MORA_KEY = 'mora';

  public ascensionStage: number = 0;
  private members: PartyMember[];

  constructor(public localization: LocalizationService,
              public party: PartyService,
              public characters: CharacterService,
              public materials: MaterialService,
              public weapons: WeaponService,
              private changeDetector: ChangeDetectorRef) {

    this.party.observable.subscribe(obs => {
      this.members = obs;
      this.changeDetector.markForCheck();
    })
  }

  ngOnInit(): void { }

  filterReqItemsNextAsc(): Map<string, number>{
    console.log("rerunning filters")
    const charMat = new Map<string, number>();

    for (const member of this.members.filter(member => member.include && member.enable_ascension)){
      const character = this.characters.get(member.character_id)

      if (member.ascension === character.ascension.length || !member.include)
        continue;

      const nextAsc = member.ascension;

      // Compute necessary materials for ascension
      for(const entry of character.ascension[nextAsc].materials){
        if (charMat.has(entry.materialId)){
          charMat.set(entry.materialId, charMat.get(entry.materialId) + entry.amount);
        } else {
          charMat.set(entry.materialId, entry.amount);
        }
      }

      // Compute necessary mora for ascension
      if(charMat.has(this.MORA_KEY)){
        charMat.set(this.MORA_KEY, charMat.get(this.MORA_KEY) + character.ascension[nextAsc].cost);
      } else {
        charMat.set(this.MORA_KEY, character.ascension[nextAsc].cost);
      }
    }
    return charMat;
  }

  filterEnaCharNextAsc(): PartyMember[] {
    return this.party.members.filter(value => value.include);
  }

  genCharAscTitle(member: PartyMember): string {
    return `${this.localization.get(member.character_id).name} - Asc. ${member.ascension === 6 ? 'Max.' : member.ascension + 1}`;
  }

  filterReqItemsNextWeaponAsc(): Map<string, number>{

    // Weapon materials, map where all materials are collected
    const weapMat = new Map<string, number>();

    for (const member of this.members.filter(member => member.include && member.enable_weapon)){
      if(!member.weapon_id || member.weapon_id == "")
        continue;

      const weapon = this.weapons.get(member.weapon_id);
      const maxAsc = weapon.ascension.length;
      const nextAsc = member.weaponAsc;

      if(member.weaponAsc == maxAsc)
        continue;

      // Compute necessary materials for ascension
      for (const me of weapon.ascension[nextAsc].materials){
        if(weapMat.has(me.materialId)){
          weapMat.set(me.materialId, me.amount + weapMat.get(me.materialId));
        } else {
          weapMat.set(me.materialId, me.amount);
        }
      }

      // Compute necessary mora for ascension
      if(weapMat.has(this.MORA_KEY)){
        weapMat.set(this.MORA_KEY, weapMat.get(this.MORA_KEY) + weapon.ascension[nextAsc].cost);
      } else {
        weapMat.set(this.MORA_KEY, weapon.ascension[nextAsc].cost);
      }
    }

    return weapMat;
  }

  filterEnaWeapNextAsc(): Map<PartyMember, Weapon> {
    const result = new Map<PartyMember, Weapon>();
    for(const member of this.members.filter(member => member.include && member.enable_weapon && !!member.weapon_id)){
      result.set(member, this.weapons.get(member.weapon_id));
    }

    return result;
  }

  genWeapAscTitle(entry: KeyValue<PartyMember, Weapon>): string {
    return `${this.localization.get(entry.value.id).name} - Asc. ${entry.key.weaponAsc === entry.value.ascension.length ? 'Max.' : entry.key.weaponAsc + 1}`;
  }

  anyWeaponsEquipped(): boolean{
    return this.members.filter(member => member.include && member.enable_weapon && member.weapon_id).length === 0;
  }
}
