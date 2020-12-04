import { Component, OnInit } from '@angular/core';
import {PartyService} from '../services/party.service';
import {MaterialEntry} from '../model/MaterialEntry';
import {PartyMember} from '../model/PartyMember';
import {WeaponService} from '../services/weapon.service';
import {MaterialService} from '../services/material.service';
import {LocalizationService} from '../services/localization.service';
import {CharacterService} from '../services/character.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public ascensionStage: number = 0;

  constructor(public localization: LocalizationService,
              public party: PartyService,
              public characters: CharacterService,
              public materials: MaterialService) { }

  ngOnInit(): void {
    for(let member of this.party.members) { }
  }

  filterReqItemsNextAsc(): Map<string, MaterialEntry>{
    const entries = new Map<string, MaterialEntry>();

    for (const member of this.party.members){
      if (member.ascension === 6 || !member.include){
        continue;
      }

      const nextStage = member.ascension;
      const character = this.characters.get(member.character_id)

      // Compute necessary materials
      for(const entry of character.ascension[nextStage].materials){
        if (entries.has(entry.material_id)){
          let oldEntry = entries.get(entry.material_id);
          oldEntry.amount = +oldEntry.amount + +entry.amount;
          entries.set(entry.material_id, oldEntry);
        } else {
          let newEntry = new MaterialEntry(
            entry.material_id,
            entry.material,
            entry.amount);
          entries.set(entry.material_id, newEntry)
        }
      }

      const moraKey = 'mora';
      // compute necessary mora
      if(entries.has(moraKey)){
        const reqMora = character.ascension[nextStage].cost;
        let oldEntry = entries.get(moraKey);
        oldEntry.amount = +oldEntry.amount + +reqMora;
        entries.set(moraKey, oldEntry);
      }
      else {
        const reqMora = character.ascension[nextStage].cost;
        let newEntry = new MaterialEntry(
          moraKey,
          this.materials.get(moraKey),
          reqMora
        );
        entries.set(moraKey, newEntry);
      }

    }
    return entries;
  }

  filterEnaCharNextAsc(): PartyMember[] {
    return this.party.members.filter(value => value.include);
  }

  genCharAscTitle(member: PartyMember): string {
    return `${this.localization.get(member.character_id).name} - Asc. ${member.ascension === 6 ? 'Max.' : member.ascension + 1}`;
  }

  onAscStageChange(): void{
    for(const member of this.party.members){
      member.ascension = this.ascensionStage;
    }
  }

  formatNumber(value: number): string{
    const dividers = [1_000_000, 1_000];
    const suffix = ['M', 'k'];

    for(let i = 0; i < dividers.length; i++) {
      if (value > dividers[i]) {
        return value / dividers[i] + suffix[i];
      }
    }
  }
}
