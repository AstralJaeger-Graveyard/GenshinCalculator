import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../../model/PartyMember';
import {Element} from '../../../model/Element';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-partymember',
  templateUrl: './partymember.component.html',
  styleUrls: ['./partymember.component.css']
})
export class PartymemberComponent implements OnInit {

  faInfo = faInfoCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  @Input()
  member: PartyMember;

  @Output()
  memberSelected = new EventEmitter<void>();

  @Output()
  memberRemoved = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(): void{
    this.memberSelected.emit();
  }

  onRemove(): void{
    this.memberRemoved.emit();
  }

  resolveElement(element: Element): string{
    switch (element){
      case Element.Anemo:
        return "Anemo";
      case Element.Cryo:
        return "Cryo";
      case Element.Electro:
        return "Electro";
      case Element.Dendro:
        return "Dendro";
      case Element.Geo:
        return "Geo";
      case Element.Hydro:
        return "Hydro";
      case Element.Pyro:
        return "Pyro";
    }
  }
}
