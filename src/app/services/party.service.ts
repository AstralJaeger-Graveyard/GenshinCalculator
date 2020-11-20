import { Injectable } from '@angular/core';
import { PartyMember } from '../model/PartyMember';
import { CharacterService } from './character.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService{

  public party: PartyMember[] = [];

  constructor(private characterService: CharacterService,
              private loggingService: LoggingService) {

    // TODO: Load party form cookie/firebase
    if (this.party.length === 0){
      loggingService.log('Initializing with default data')
      this.party.push(new PartyMember(this.characterService.characterMap.get('traveler (anemo)'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('amber'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('kaeya'), 1, 1));
      this.party.push(new PartyMember(this.characterService.characterMap.get('lisa'), 1, 1));
    }
  }
}
