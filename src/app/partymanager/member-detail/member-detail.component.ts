import {Component, EventEmitter, Input, isDevMode, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {WeaponService} from '../../services/weapon.service';
import {CharacterService} from '../../services/character.service';
import {LocalizationService} from '../../services/localization.service';
import {Weapon} from '../../model/Weapon';
import {KeyValue} from '@angular/common';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import {ArtifactService} from "../../services/artifact.service";
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-partymember-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  @Input()
  member: PartyMember;

  @Output()
  closeDetail = new EventEmitter<void>();

  @Output()
  memberChanged = new EventEmitter<void>();

  maxArtifactCount = 2;
  userKind: string = 'anon';

  weaponOrder = (a: KeyValue<string, Weapon>, b: KeyValue<string, Weapon>): number => {
    return b.value.rarity - a.value.rarity;
  }

  constructor(public localization: LocalizationService,
              public weapons: WeaponService,
              public artifacts: ArtifactService,
              public characters: CharacterService,
              public gAnalytics: GoogleAnalyticsService,
              public notifications: NzNotificationService) { }

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

  onArtifactEnabledChanged(): void {
    this.gAnalytics.event('artifact_enabled_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onArtifactChanged(): void {
    if (this.userKind === 'anon' && this.member.artifacts.length >= 2) {
      this.gAnalytics.event('anon_artifact_limit_reached', 'party_member_detail', 'party_member');
      this.notifications.info("Artifact limit reached", "Please sign-in or create an account to get access to 3 artifacts.");
    }
    else if (this.userKind === 'free' && this.member.artifacts.length >= 3) {
      this.gAnalytics.event('free_artifact_limit_reached', 'party_member_detail', 'party_member');
      this.notifications.info("Artifact limit reached", "Please sign-up to premium to get access to 5 artifacts.");
    }
    else if (this.userKind === 'premium' && this.member.artifacts.length >= 5) {
      this.gAnalytics.event('premium_artifact_limit_reached', 'party_member_detail', 'party_member');
      this.notifications.info("Artifact limit reached", "Maximum artifact limit reached!");
    }

    this.gAnalytics.event('artifact_changed', 'party_member_detail', 'party_member');
    this.onMemberChanged();
  }

  onMemberChanged(): void{
    if(isDevMode())
      console.log('Party member changed')
    this.memberChanged.emit();
  }

  toTitle(text: string): string {
    text = text.replace(/_/g, ' ');
    return text;
  }
}
