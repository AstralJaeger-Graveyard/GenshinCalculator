import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';
import {Element} from '../../../model/Element';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import {LocalizationService} from '../../../services/localization.service';
import {CharacterService} from '../../../services/character.service';

@Component({
  selector: 'app-partymember',
  templateUrl: './partymember.component.html',
  styleUrls: ['./partymember.component.scss']
})
export class PartymemberComponent implements OnInit {

  @Input()
  member: PartyMember;

  @Input()
  forceDelete: boolean = false;

  @Output()
  memberDisabled = new EventEmitter<void>();

  @Output()
  memberSelected = new EventEmitter<void>();

  @Output()
  memberRemoved = new EventEmitter<void>();

  constructor(public localService: LocalizationService,
              public charService: CharacterService) { }

  ngOnInit(): void {
  }

  onDisabled(): void{
    this.memberDisabled.emit();
  }

  onSelected(): void{
    this.memberSelected.emit();
  }

  onRemove(): void{
    this.memberRemoved.emit();
  }
}
