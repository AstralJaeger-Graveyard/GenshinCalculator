import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';
import {Element} from '../../../model/Element';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import {LocalizationService} from '../../../services/localization.service';
import {CharacterService} from '../../../services/character.service';

@Component({
  selector: 'app-partymember',
  templateUrl: './partymember.component.html',
  styleUrls: ['./partymember.component.css']
})
export class PartymemberComponent implements OnInit {

  @Input()
  member: PartyMember;

  @Input()
  forceDelete: boolean = false;

  @Output()
  memberSelected = new EventEmitter<void>();

  @Output()
  memberRemoved = new EventEmitter<void>();

  constructor(public localService: LocalizationService,
              public charService: CharacterService) { }

  ngOnInit(): void {
  }

  onSelected(): void{
    this.memberSelected.emit();
  }

  onRemove(): void{
    this.memberRemoved.emit();
  }
}
