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
import {Element} from "../model/Element";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {

  private readonly DAILY_INDEX = 7;
  public onlyToday = false;
  public days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Daily'
  ];
  private characterSourceBins: Map<string, ScheduleSource>
  public dayBins: Map<number, ScheduleSource[]>;

  public today: number = 0;

  constructor(public party: PartyService,
              public characters: CharacterService,
              public materials: MaterialService,
              public sources: SourceService,
              public localization: LocalizationService,
              private changeDetector: ChangeDetectorRef) {

    this.characterSourceBins = new Map<string, ScheduleSource>();
    this.dayBins = new Map<number, ScheduleSource[]>();

    this.party.observable.subscribe(observable => {
      changeDetector.markForCheck();
      for (let i = 0; i < this.days.length; i++) {
        this.dayBins.set(i, []);
      }
      this.computeSourceBins();
      this.computeDayBins();

      const d = new Date();
      this.today = d.getDay();
    })
  }

  ngOnInit(): void {
  }

  private computeSourceBins(): void{
    this.characterSourceBins.clear();
    for (const member of this.party.members.filter(m => m.include)){
      for (const matEntry of this.getNextAscMat(member)){
        const srcs: MaterialSource[] = this.materials
          .get(matEntry.materialId)
          .source
          .map(src => this.sources.get(src))
          .filter(src => !src.isIgnoreSource);
        for (const src of srcs){
          this.addMaterialToBin(
            this.getActualSrc(src),
            this.materials.get(matEntry.materialId),
            matEntry.amount,
            member.characterId
          );
        }
      }
    }
  }

  private computeDayBins(){
    for(const key of this.characterSourceBins.keys()){
      const value = this.characterSourceBins.get(key);
      if(value.source.available){
        for (let i of value.source.available) {
          this.dayBins.get(i).push(value);
        }
      } else {
        this.dayBins.get(this.DAILY_INDEX).push(value);
      }
    }
  }

  private addMaterialToBin(src: MaterialSource, mat: Material, amount: number, char: string){
    if(!this.characterSourceBins.has(src.id)){
      const chars = new Map<string, Character[]>();
      chars.set(mat.id, [this.characters.get(char)]);
      const amo = new Map<string, number>();
      amo.set(mat.id, amount);
      const scheduleSrc = new ScheduleSource(src, chars, amo);
      this.characterSourceBins.set(src.id, scheduleSrc);
    }
    else {
      let scheduleSrc = this.characterSourceBins.get(src.id);
      const mats = scheduleSrc.materials;
      if (!mats.has(mat.id)){
        mats.set(mat.id, [this.characters.get(char)]);
      }
      else {
        const matsValue = mats.get(mat.id);
        if(matsValue.filter(c => c.id === char).length === 0) {
          matsValue.push(this.characters.get(char));
        }
      }

      const amo = scheduleSrc.amounts;
      if (!amo.has(mat.id)){
        amo.set(mat.id, amount);
      }
      else {
        amo.set(mat.id, +amo.get(mat.id) + +amount);
      }
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
    return this.characters.get(member.characterId).ascension[this.getNextAsc(member)].materials;
  }

}
