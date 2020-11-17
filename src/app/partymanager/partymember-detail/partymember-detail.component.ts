import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import { faStar, faWindowClose } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-partymember-detail',
  templateUrl: './partymember-detail.component.html',
  styleUrls: ['./partymember-detail.component.css']
})
export class PartymemberDetailComponent implements OnInit {

  faRegularStar = faStar;
  faWindowClose = faWindowClose;

  @Input()
  member: PartyMember;

  @Output()
  closeDetail = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseDetail(): void{
    this.closeDetail.emit();
  }
}
