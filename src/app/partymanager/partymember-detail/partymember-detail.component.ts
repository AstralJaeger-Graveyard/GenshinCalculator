import {Component, Input, OnInit} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-partymember-detail',
  templateUrl: './partymember-detail.component.html',
  styleUrls: ['./partymember-detail.component.css']
})
export class PartymemberDetailComponent implements OnInit {

  faRegularStar = faStar;
  arr = Array;


  @Input()
  member: PartyMember;

  constructor() { }

  ngOnInit(): void {
  }
}
