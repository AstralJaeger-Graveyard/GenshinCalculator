import {Component, Input, OnInit} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';
import {CharacterService} from '../../../services/character.service';
import {LocalizationService} from '../../../services/localization.service';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.css']
})
export class MemberHeaderComponent implements OnInit {

  @Input()
  member: PartyMember;

  constructor(public localization: LocalizationService,
              public characters: CharacterService) { }

  ngOnInit(): void {
  }

}
