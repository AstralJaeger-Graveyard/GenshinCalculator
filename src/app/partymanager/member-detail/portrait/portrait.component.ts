import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../model/Character';
import {Element} from '../../../model/Element';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.css']
})
export class PortraitComponent implements OnInit {

  @Input()
  character: Character = new Character("NULL", "Description", Element.Dendro);

  constructor() { }

  ngOnInit(): void {
  }

}
