import {Component, EventEmitter, Input, isDevMode, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {Character} from '../../model/Character';
import { CharacterService } from '../../services/character.service';
import { PartyService } from '../../services/party.service';
import { LocalizationService } from '../../services/localization.service';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

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
    if(isDevMode()) {
      console.log('Switching selected member to: ' + member.character_id);
    }
    this.memberSelected.emit(member);
  }

  onRemoved(member: PartyMember): void{
    this.memberRemoved.emit(member);
    this.onMemberChanged();
  }

  onCharacterSelected(character: Character) {
    if (this.party.members.filter(member => member.character_id === character.id).concat().length === 0) {
      if(isDevMode()){
        console.log("Adding party member: ", character.id);
      }

      let partyMember = new PartyMember(character.id);
      this.party.members.push(partyMember);

      // TODO: Somewhat improve this
      this.onMemberChanged()
    }
  }

  onMemberChanged(){
    this.party.save();

    if(isDevMode()) {
      console.log('%cSaving party to local storage', 'color: gray; font-size: 15px;');
    }
  }

  onAddDefaultData(): void {
    this.party.addDefaultParty();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.party.members, event.previousIndex, event.currentIndex);
    this.onMemberChanged();
  }
}
