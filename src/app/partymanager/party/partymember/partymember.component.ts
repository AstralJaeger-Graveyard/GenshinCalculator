import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyCharacter} from '../../../model/PartyCharacter';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input()
  member: PartyCharacter;

  @Output()
  memberSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(): void{
    this.memberSelected.emit();
  }
}
