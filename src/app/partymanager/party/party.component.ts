import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {Character} from '../../model/Character';
import {CharacterService} from '../../services/character.service';
import {faBell as fasBell} from '@fortawesome/pro-solid-svg-icons';
import {faExclamationTriangle, faTrashAlt, faEdit} from '@fortawesome/pro-light-svg-icons';
import {PartyService} from '../../services/party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  fasBell = fasBell;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faExclamation = faExclamationTriangle;

  @Input()
  party: PartyMember[];

  @Input()
  characters: Map<string, Character> = new Map<string, Character>();

  @Output()
  memberSelected = new EventEmitter<PartyMember>();

  @Output()
  memberRemoved = new EventEmitter<PartyMember>();

  selectValue = null;
  forceDelete: boolean;

  constructor(private characterService: CharacterService,
              private partyService: PartyService) { }

  ngOnInit(): void {
    this.characters = this.characterService.getCharacterMap;
  }

  onSelected(member: PartyMember): void{
    console.log('Switching selected member to: ' + member.character.name);
    this.memberSelected.emit(member);
  }

  onRemoved(member: PartyMember): void{
    this.memberRemoved.emit(member);
  }

  onCharacterSelected(character: Character) {
    if (this.party.filter(member => member.character === character).concat().length === 0) {
      this.party.push(new PartyMember(character, 1, 0));
    }
    else {
      // TODO: Show some kind of warning
    }
  }

  isInParty(character: Character): boolean{
    for (const member of this.partyService.party){
      if (member.character.name === character.name){
        return true;
      }
    }
    return false;
  }

  addDefaultParty(): void {
    this.partyService.addDefaultParty();
  }
}
