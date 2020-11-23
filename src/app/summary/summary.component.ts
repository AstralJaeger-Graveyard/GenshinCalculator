import { Component, OnInit } from '@angular/core';
import {PartyService} from '../services/party.service';
import {MaterialService} from '../services/material.service';
import {PartyMember} from '../model/PartyMember';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(public partyService: PartyService,
              public materialService: MaterialService) { }

  ngOnInit(): void {
    for(let member of this.partyService.party) {
      if(member.character.ascension) {
        this.materialService.resolveMaterials(member.character);
      }
    }
  }
}
