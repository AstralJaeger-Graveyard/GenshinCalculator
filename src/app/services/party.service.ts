import {Injectable, OnInit} from '@angular/core';
import {PartyMember} from '../model/PartyMember';
import {CharacterService} from './character.service';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService implements OnInit{

  public party: PartyMember[] = [];

  constructor(private characterService: CharacterService,
              private loggingService: LoggingService) { }

  ngOnInit(): void {
    // TODO: Load party from cookie/firebase

    this.loggingService.log("Adding default data: " + (this.party.length === 0));
    // Add default data to party
    if (this.party.length === 0){
      this.loggingService.log("Adding default data");
      this.party.push(new PartyMember(this.characterService.characterMap.get('traveler (anemo)'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('amber'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('kaeya'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('lisa'), 1, 1));
    }
  }
}
