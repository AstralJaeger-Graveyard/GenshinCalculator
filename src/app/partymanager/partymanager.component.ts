import {Component, OnInit} from '@angular/core';
import {Character} from '../model/Character';
import {PartyMember} from '../model/PartyMember';
import { CharacterService } from '../services/character.service';
import {PartyService} from '../services/party.service';
import {LocalizationService} from '../services/localization.service';

@Component({
  selector: 'app-partymanager',
  templateUrl: './partymanager.component.html',
  styleUrls: ['./partymanager.component.css']
})
export class PartymanagerComponent implements OnInit {

  public selectedCharacter: PartyMember;

  constructor(public localization:LocalizationService,
              public characters: CharacterService,
              public party: PartyService) {
  }

  ngOnInit(): void {
  }

  onSelected(member: PartyMember): void{
    this.selectedCharacter = member;
  }

  onRemoved(member: PartyMember): void{
    const index: number = this.party.members.indexOf(member);
    this.party.members.splice(index, 1);
    this.selectedCharacter = null;
    this.onMemberChanged()
  }

  onCloseDetail(): void{
    this.selectedCharacter = null;
  }

  onMemberChanged(): void{
    this.party.save()
    console.log('%cSaving party to local storage', 'color: gray; font-size: 15px;')
  }
}
