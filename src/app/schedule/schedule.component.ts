import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../services/character.service";
import {PartyService} from "../services/party.service";
import {LocalizationService} from "../services/localization.service";
import {MaterialService} from "../services/material.service";
import {SourceService} from "../services/source.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public onlyToday = false;
  public days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(public party: PartyService,
              public characters: CharacterService,
              public materials: MaterialService,
              public sources: SourceService,
              public localization: LocalizationService) { }

  ngOnInit(): void {
  }
}
