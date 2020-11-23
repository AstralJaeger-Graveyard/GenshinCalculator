import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {Character} from '../../model/Character';
import {CharacterService} from '../../services/character.service';
import {faBell as fasBell} from '@fortawesome/pro-solid-svg-icons';
import {faInfoCircle, faTrashAlt, faEdit} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  fasBell = fasBell;
  faInfo = faInfoCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;

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

  constructor(private characterService: CharacterService) { }

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
      this.party.push(new PartyMember(character, 1, 1));
    }
    else {
      // TODO: Show some kind of warning
    }
  }
}
