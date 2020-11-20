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

  displayMode: string = "portrait";

  constructor() { }

  ngOnInit(): void {
  }

  onCloseDetail(): void{
    this.closeDetail.emit();
  }

  getTagColor(): string{
    switch (this.member.character.tier.toLowerCase()){
      case 's':
        return '#ff7f7f';
      case 'a':
        return '#ffbf7f';
      case 'b':
        return '#ffff7f';
      case 'c':
        return '#bfff7f';
      case 'd':
        return '#7fff7f';
      default:
        return '#a0a0a0'
    }
  }
}
