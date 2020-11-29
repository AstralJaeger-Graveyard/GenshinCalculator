import {Component, Input, OnInit} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.css']
})
export class MemberHeaderComponent implements OnInit {

  @Input()
  member: PartyMember;

  constructor() { }

  ngOnInit(): void {
  }

}
