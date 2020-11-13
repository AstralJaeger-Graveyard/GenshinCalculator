import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyCharacter} from '../../model/PartyCharacter';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  @Input()
  party: PartyCharacter[];

  @Output()
  memberSelected = new EventEmitter<PartyCharacter>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(member: PartyCharacter): void{
    console.log('Switching selected member to: ' + member.character.name);
    this.memberSelected.emit(member);
  }
}
