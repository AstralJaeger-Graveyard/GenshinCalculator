import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';

@Component({
  selector: 'app-partymember',
  templateUrl: './partymember.component.html',
  styleUrls: ['./partymember.component.css']
})
export class PartymemberComponent implements OnInit {

  @Input()
  member: PartyMember;

  @Output()
  memberSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(): void{
    this.memberSelected.emit();
  }
}
