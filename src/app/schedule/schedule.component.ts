import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {PartyService} from '../services/party.service';
import {LocalizationService} from '../services/localization.service';
import {MaterialService} from '../services/material.service';
import {SourceService} from '../services/source.service';
import {ScheduleSource} from '../model/ScheduleSource';
import {MaterialSource} from '../model/MaterialSource';
import {Character} from '../model/Character';
import {Material} from "../model/Material";
import {PartyMember} from "../model/PartyMember";
import {MaterialEntry} from "../model/MaterialEntry";
import {WeaponService} from "../services/weapon.service";

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
  public characterDayBins: Map<number, ScheduleSource[]>;

  private weaponSourceBins: Map<string, ScheduleSource>;
  public weaponDayBins: Map<number, ScheduleSource[]>;

  public today: number = 0;

  constructor(public party: PartyService,
              public characters: CharacterService,
              public weapons: WeaponService,
              public materials: MaterialService,
              public sources: SourceService,
              public localization: LocalizationService,
              private changeDetector: ChangeDetectorRef) {

    this.characterSourceBins = new Map<string, ScheduleSource>();
    this.weaponSourceBins = new Map<string, ScheduleSource>();

    this.characterDayBins = new Map<number, ScheduleSource[]>();
    this.weaponDayBins = new Map<number, ScheduleSource[]>();

    this.party.observable.subscribe(observable => {
      changeDetector.markForCheck();
      for (let i = 0; i < this.days.length; i++) {
        this.characterDayBins.set(i, []);
        this.weaponDayBins.set(i, []);
      }

      this.computeCharSourceBins();
      this.computeWeapSourceBins();
      this.computeCharDayBins();
      this.computeWeapDayBins();

      const d = new Date();
      this.today = d.getDay();
    })
  }

  ngOnInit(): void {
  }

  private computeCharSourceBins(): void{
    this.characterSourceBins.clear();
    for (const member of this.party.members.filter(m => m.include)){
      this.constructBins(
        this.characterSourceBins,
        this.getNextAscMat(member),
        member
      );
    }
  }

  private computeWeapSourceBins(): void{
    this.weaponSourceBins.clear();
    for (const member of this.party.members.filter(m => m.include && m.enableWeapon && !!m.weaponId)){
      this.constructBins(
        this.weaponSourceBins,
        this.getNextWeapAscMat(member),
        member
      );
    }
  }

  private computeCharDayBins(): void {
    for(const key of this.characterSourceBins.keys()){
      const value = this.characterSourceBins.get(key);
      if(value.source.available){
        for (let i of value.source.available) {
          this.characterDayBins.get(i).push(value);
        }
      } else {
        this.characterDayBins.get(this.DAILY_INDEX).push(value);
      }
    }
  }

  private computeWeapDayBins(): void {
    for (const key of this.weaponSourceBins.keys()){
      const value = this.weaponSourceBins.get(key);
      this.categorizeIntoDay(this.weaponDayBins, value);
    }
  }

  private categorizeIntoDay(bins: Map<number, ScheduleSource[]>, value: ScheduleSource){
    if(value.source.isRestrictedSource){
      const materials = Array.from(value.materials.keys()).map(m => this.materials.get(m));
      for (let material of materials) {
        const sources = material.source
          .map(s => this.sources.get(s))
          .filter(s => !s.isIgnoreSource);
        for (let src of sources) {
          for (let day of src.available) {
            const binValue = bins.get(day);
            if (!binValue.find(bV => bV.source.id === src.superSource)){
              binValue.push(value);
            }
          }
        }
      }
    }
    else {
      bins.get(this.DAILY_INDEX).push(value);
    }
  }

  private constructBins(bin: Map<string, ScheduleSource>, data: MaterialEntry[], member: PartyMember): void {
    for (const matEntry of data){
      const srcs: MaterialSource[] = this.materials
        .get(matEntry.materialId)
        .source
        .map(src => this.sources.get(src))
        .filter(src => !src.isIgnoreSource);
      for (const src of srcs) {
        this.addMaterialToBin(
          bin,
          this.getActualSrc(src),
          this.materials.get(matEntry.materialId),
          matEntry.amount,
          member.characterId
        );
      }
    }
  }

  private addMaterialToBin(bin: Map<string, ScheduleSource>, src: MaterialSource, mat: Material, amount: number, char: string){
    if(!bin.has(src.id)){
      const chars = new Map<string, Character[]>();
      chars.set(mat.id, [this.characters.get(char)]);
      const amo = new Map<string, number>();
      amo.set(mat.id, amount);
      const scheduleSrc = new ScheduleSource(src, chars, amo);
      bin.set(src.id, scheduleSrc);
    }
    else {
      let scheduleSrc = bin.get(src.id);
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

  private getNextWeapAsc(member: PartyMember): number {
    return member.weaponAsc;
  }

  private getNextAscMat(member: PartyMember): MaterialEntry[]{
    return this.characters
      .get(member.characterId)
      .ascension[this.getNextAsc(member)]
      .materials;
  }

  private getNextWeapAscMat(member: PartyMember): MaterialEntry[] {
    return this.weapons
      .get(member.weaponId)
      .ascension[this.getNextWeapAsc(member)]
      .materials;
  }

}
