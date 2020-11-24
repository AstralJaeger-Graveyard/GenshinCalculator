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
      loggingService.log('Initializing with default data', null)
      this.party.push(new PartyMember(this.characterService.getCharacterMap.get('traveler (anemo)'), 1, 1));
      this.party.push(new PartyMember(this.characterService.getCharacterMap.get('amber'), 1, 1));
      this.party.push(new PartyMember(this.characterService.getCharacterMap.get('kaeya'), 1, 1));
      this.party.push(new PartyMember(this.characterService.getCharacterMap.get('lisa'), 1, 1));
    }
  }
}
