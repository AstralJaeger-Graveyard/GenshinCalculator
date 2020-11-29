import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import { faStar, faWindowClose } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-partymember-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  faRegularStar = faStar;
  faWindowClose = faWindowClose;

  @Input()
  member: PartyMember;

  @Output()
  closeDetail = new EventEmitter<void>();

  displayMode: string = "portrait";

  constructor() { }

  ngOnInit(): void {
  }

  onAscensionStageChange(){

  }

  onCloseDetail(): void{
    this.closeDetail.emit();
  }
}
