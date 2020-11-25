import {Component, Input, OnInit} from '@angular/core';
import {MaterialEntry} from '../../model/MaterialEntry';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  entry: MaterialEntry;

  constructor() { }

  ngOnInit(): void {
  }

}
