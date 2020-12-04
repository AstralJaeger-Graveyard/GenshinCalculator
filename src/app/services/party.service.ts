import { Injectable } from '@angular/core';
import { PartyMember } from '../model/PartyMember';

@Injectable({
  providedIn: 'root'
})
export class PartyService{

  private static LS_KEY = 'party';

  public members: PartyMember[] = [];

  constructor() {
    this.members = PartyService.getPartyFromLS();
    PartyService.storePartyToLS(this.members);
  }

  public get length(): number {
    return this.members.length;
  }

  public save(){
    PartyService.storePartyToLS(this.members);
  }

  public addDefaultParty(){
    this.members = PartyService.generateDefaultParty();
  }

  public contains(id: string): boolean{
    for(let member of this.members){
      if(member.character_id == id){
        return true;
      }
    }
    return false;
  }

  private static generateDefaultParty(): PartyMember[] {

    let party = [];
    const defaultParty = ['traveler_anemo', 'amber', 'kaeya', 'lisa'];
    for(let member of defaultParty){
      let partyMember = new PartyMember();
      partyMember.character_id = member;
      partyMember.ascension = 0;
      partyMember.level = 1;
      party.push(partyMember);
    }
    return party;
  }

  private static getPartyFromLS(): PartyMember[] {
    let localParty = JSON.parse(localStorage.getItem('party'));
    if (!localParty){
      localParty = PartyService.generateDefaultParty();
    }
    return localParty;
  }

  private static storePartyToLS(party: PartyMember[]): void{
    localStorage.setItem(PartyService.LS_KEY, JSON.stringify(party));
  }
}
