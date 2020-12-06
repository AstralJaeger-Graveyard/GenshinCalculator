import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import { faStar, faWindowClose } from '@fortawesome/pro-solid-svg-icons';
import {PartyService} from '../../services/party.service';
import {WeaponService} from '../../services/weapon.service';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../model/Character';
import {LocalizationService} from '../../services/localization.service';

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

  constructor(public localization: LocalizationService,
              public weapons: WeaponService,
              public characters: CharacterService) { }

  ngOnInit(): void { }

  onCloseDetail(): void{
    this.closeDetail.emit();
  }

  onMemberChanged(): void{
    console.log('Party member changed')
    this.memberChanged.emit();
  }
}