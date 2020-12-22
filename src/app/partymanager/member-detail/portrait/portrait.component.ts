import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../model/Character';
import {Element} from '../../../model/Element';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnInit {

  @Input()
  character: Character = null;

  constructor() { }

  ngOnInit(): void {
  }

}
