import {Component, OnInit} from '@angular/core';
import {Character} from '../model/Character';
import {PartyMember} from '../model/PartyMember';
import { CharacterService } from '../services/character.service';
import {PartyService} from '../services/party.service';

@Component({
  selector: 'app-partymanager',
  templateUrl: './partymanager.component.html',
  styleUrls: ['./partymanager.component.css']
})
export class PartymanagerComponent implements OnInit {
  public characters: Map<string, Character>;
  public party: PartyMember[] = [];
  public selectedCharacter: PartyMember;

  constructor(private characterService: CharacterService,
              private partyService: PartyService) {  }

  ngOnInit(): void {
     this.characters = this.characterService.characterMap;
     this.party = this.partyService.party;
  }

  onSelected(member: PartyMember): void{
    this.selectedCharacter = member;
  }

  onRemoved(member: PartyMember): void{
    const index: number = this.party.indexOf(member);
    this.party.splice(index, 1);
    this.selectedCharacter = null;
  }

  onCloseDetail(): void{
    this.selectedCharacter = null;
  }
}
