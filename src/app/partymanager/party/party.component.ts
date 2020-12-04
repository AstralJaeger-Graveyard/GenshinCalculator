import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {Character} from '../../model/Character';
import {CharacterService} from '../../services/character.service';
import {faBell as fasBell} from '@fortawesome/pro-solid-svg-icons';
import {faExclamationTriangle, faTrashAlt, faEdit} from '@fortawesome/pro-light-svg-icons';
import {PartyService} from '../../services/party.service';
import {LocalizationService} from '../../services/localization.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

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

  @Output()
  memberSelected = new EventEmitter<PartyMember>();

  @Output()
  memberRemoved = new EventEmitter<PartyMember>();

  selectValue = null;
  forceDelete: boolean;

  constructor(public localization: LocalizationService,
              public characters: CharacterService,
              public party: PartyService) { }

  ngOnInit(): void {
  }

  onSelected(member: PartyMember): void{
    console.log('Switching selected member to: ' + member.character_id);
    this.memberSelected.emit(member);
  }

  onRemoved(member: PartyMember): void{
    this.memberRemoved.emit(member);
    this.onMemberChanged();
  }

  onCharacterSelected(character: Character) {
    if (this.party.members.filter(member => member.character_id === character.id).concat().length === 0) {
      let partyMember = new PartyMember();
      partyMember.character_id = character.id;
      partyMember.ascension = 0;
      partyMember.level = 1;
      this.party.members.push(partyMember);

      // TODO: Somewhat improve this
      this.onMemberChanged()
    }
    else {
      // TODO: Show some kind of warning
    }
  }

  onMemberChanged(){
    this.party.save();
    console.log('%cSaving party to local storage', 'color: gray; font-size: 15px;')
  }

  onAddDefaultData(): void {
    this.party.addDefaultParty();
  }
}
