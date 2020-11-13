import {Component, Input, OnInit} from '@angular/core';
import {PartyCharacter} from '../../model/PartyCharacter';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  @Input()
  member: PartyCharacter;

  constructor() { }

  ngOnInit(): void {
  }

}
