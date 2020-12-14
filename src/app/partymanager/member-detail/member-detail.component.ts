import {Component, EventEmitter, Input, isDevMode, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import { faStar, faWindowClose } from '@fortawesome/pro-solid-svg-icons';
import {PartyService} from '../../services/party.service';
import {WeaponService} from '../../services/weapon.service';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../model/Character';
import {LocalizationService} from '../../services/localization.service';
import {Weapon} from '../../model/Weapon';
import {KeyValue} from '@angular/common';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
  selector: 'app-partymember-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @Input()
  member: PartyMember;

  @Output()
  closeDetail = new EventEmitter<void>();

  @Output()
  memberChanged = new EventEmitter<void>();

  weaponOrder = (a: KeyValue<string, Weapon>, b: KeyValue<string, Weapon>): number => {
    return b.value.rarity - a.value.rarity;
  }

  constructor(public localization: LocalizationService,
              public weapons: WeaponService,
              public characters: CharacterService,
              public gAnalytics: GoogleAnalyticsService) { }

  ngOnInit(): void { }

  onCloseDetail(): void{
    this.closeDetail.emit();
  }

  onAscensionEnabledChanged(): void {
    this.gAnalytics.event('ascension_enabled_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onAscensionStageChanged(): void {
    this.gAnalytics.event('ascension_stage_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onWeaponChanged(): void {
    this.gAnalytics.event('weapon_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onWeaponAscensionEnabledChanged(): void {
    this.gAnalytics.event('weapon_ascension_enabled_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onWeaponAscensionStageChanged(): void {
    this.gAnalytics.event('weapon_ascension_stage_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onMemberChanged(): void{
    if(isDevMode())
      console.log('Party member changed')
    this.memberChanged.emit();
  }
}
