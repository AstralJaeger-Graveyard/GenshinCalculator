import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {PartyService} from '../services/party.service';
import {LocalizationService} from '../services/localization.service';
import {MaterialService} from '../services/material.service';
import {SourceService} from '../services/source.service';
import {ScheduleSource} from '../model/ScheduleSource';
import {MaterialSource} from '../model/MaterialSource';
import {Character} from '../model/Character';
import {KeyValue} from '@angular/common';
import {Material} from "../model/Material";
import {PartyMember} from "../model/PartyMember";
import {MaterialEntry} from "../model/MaterialEntry";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {

  public onlyToday = false;
  public days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  private sourceBins: Map<string, ScheduleSource[]>

  constructor(public party: PartyService,
              public characters: CharacterService,
              public materials: MaterialService,
              public sources: SourceService,
              public localization: LocalizationService,
              private changeDetector: ChangeDetectorRef) {

    this.sourceBins = new Map<string, Material[]>();

    this.party.observable.subscribe(observable => {
      changeDetector.markForCheck();
      this.computeSouceBins();
      // const d = new Date();
      // console.log('Current day: ' + d.getDay());
    })
  }

  ngOnInit(): void {
  }

  public trackAscMatScheduleBy(index, item: KeyValue<string, ScheduleSource>){
    return item.key;
  }

  public computeAscensionMaterialSchedule(): Map<string, ScheduleSource>{
    const sSources = new Map<string, ScheduleSource>();
    for (let member of this.party.members.filter(m => m.include && m.enable_ascension && m.ascension !== this.getMaxAsc(m.character_id))){
      const nextAsc = member.ascension;
      const materials = this.characters.get(member.character_id).ascension[nextAsc].materials;
      for (let me of materials){
        const sources = this.materials.get(me.materialId)
          .source
          .map(src => this.sources.get(src))
          .filter(src => !src.isIgnoreSource);
        for (let src of sources){
          const actualSrc: MaterialSource = this.getActualSrc(src);

          if(!sSources.has(actualSrc.id)){
            const materials = new Map<string, Character[]>();
            materials.set(me.materialId, [this.characters.get(member.character_id)]);
            const amounts = new Map<string, number>();
            amounts.set(me.materialId, me.amount);
            sSources.set(actualSrc.id, new ScheduleSource(actualSrc, materials, amounts));
          }
          else {
            const sSource = sSources.get(actualSrc.id);
            const materials = sSource.materials;
            const amounts = sSource.amounts;

            if(!materials.has(me.materialId)){
              materials.set(me.materialId, [this.characters.get(member.character_id)]);
              amounts.set(me.materialId, me.amount);
            }
            else {
              materials.set(me.materialId, [...materials.get(me.materialId), this.characters.get(member.character_id)]);
              amounts.set(me.materialId, amounts.get(me.materialId) + me.amount);
            }
          }
        }
      }
    }
    return sSources
  }

  private computeSouceBins(){
    for (const member of this.party.members.filter(m => m.include)){
      for (const matEntry of this.getNextAscMat(member)){
        // console.log('MaterialEntry: ' + matEntry.materialId);
        const srcs: MaterialSource[] = this.materials
          .get(matEntry.materialId)
          .source
          .map(src => this.sources.get(src))
          .filter(src => !src.isIgnoreSource);
        for (const src of srcs){
          this.addMaterialToBin(
            this.getActualSrc(src),
            this.materials.get(matEntry.materialId),
            member.character_id
          );
        }
      }
    }
    console.dir(this.sourceBins);
  }

  private addMaterialToBin(src: MaterialSource, mat: Material, char: string){
    if(!this.sourceBins.has(src.id)){
      console.log('Source: ' + src.id);
      const chars = new Map<string, Character[]>();
      chars.set(mat.id, [this.characters.get(char)]);
      const amo = new Map<string, number>();
      amo.set(mat.id, 1);
      const scheduleSrc = new ScheduleSource(src, chars, amo);
      this.sourceBins.set(src.id, [scheduleSrc]);
    }
    else {
      let scheduleSrc = this.sourceBins.get(src.id);
      
    }
  }

  private getMaxAsc(characterId: string): number{
    return this.characters.get(characterId).ascension.length;
  }

  private getActualSrc(src: MaterialSource): MaterialSource{
    if(src.isSuperSource)
      return src;
    return this.sources.get(src.superSource);
  }

  private getNextAsc(member: PartyMember): number {
    return member.ascension;
  }

  private getNextAscMat(member: PartyMember): MaterialEntry[]{
    return this.characters.get(member.character_id).ascension[this.getNextAsc(member)].materials;
  }

}
