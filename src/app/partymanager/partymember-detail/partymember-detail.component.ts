import {Component, Input, OnInit} from '@angular/core';
import {PartyCharacter} from '../../model/PartyCharacter';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  faRegularStar = faStar;
  arr = Array;


  @Input()
  member: PartyCharacter;

  constructor() { }

  ngOnInit(): void {
  }
}
