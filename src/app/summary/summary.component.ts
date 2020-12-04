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

  constructor(public localizationService: LocalizationService,
              public partyService: PartyService,
              public characterService: CharacterService,
              public materialService: MaterialService) { }

  ngOnInit(): void {
    for(let member of this.partyService.members) { }
  }

  filterReqItemsNextAsc(): Map<string, MaterialEntry>{
    const entries = new Map<string, MaterialEntry>();

    for (const member of this.partyService.members){
      if (member.ascension === 6 || !member.include){
        continue;
      }
      const nextStage = member.ascension;
      let character = this.characterService.characterMap.get(member.character_id)

      // Compute necessary materials
      for(const entry of character.ascension[nextStage].materials){
        if (entries.has(entry.material_id)){
          let oldEntry = entries.get(entry.material_id);
          oldEntry.amount = +oldEntry.amount + +entry.amount;
          entries.set(entry.material_id, oldEntry);
        } else {
          let newEntry = new MaterialEntry();
          newEntry.material_id = entry.material_id;
          newEntry.material = entry.material;
          newEntry.amount = +entry.amount;
          entries.set(entry.material_id, newEntry)
        }
      }

      // compute necessary mora
      if(entries.has('mora')){
        const reqMora = character.ascension[nextStage].cost;
        let oldEntry = entries.get('mora');
        oldEntry.amount = +oldEntry.amount + +reqMora;
        entries.set('mora', oldEntry);
      }
      else {
        const reqMora = character.ascension[nextStage].cost;
        let newEntry = new MaterialEntry();
        newEntry.material = this.materialService.getMaterialsMap.get('mora');
        newEntry.amount = reqMora;
        entries.set('mora', newEntry);
      }

    }
    return entries;
  }

  filterEnaCharNextAsc(): PartyMember[] {
    return this.partyService.members.filter(value => value.include);
  }

  genCharAscTitle(member: PartyMember): string {
    return `${member.character_id} - Asc. ${member.ascension === 6 ? 6 : member.ascension + 1}`;
  }

  onAscStageChange(): void{
    for(const member of this.partyService.members){
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
