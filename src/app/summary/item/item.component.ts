import {Component, Input, OnInit} from '@angular/core';
import {MaterialEntry} from '../../model/MaterialEntry';
import {MaterialService} from '../../services/material.service';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input('materialId')
  id: string;

  @Input('materialAmount')
  amount: number

  constructor(public localization: LocalizationService,
              public materials: MaterialService) { }

  ngOnInit(): void {
  }

}
