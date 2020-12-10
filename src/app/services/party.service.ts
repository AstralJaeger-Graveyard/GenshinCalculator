import { Injectable } from '@angular/core';
import { PartyMember } from '../model/PartyMember';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService{

  private static LS_KEY = 'party';

  public members: PartyMember[] = [];

  public observable: BehaviorSubject<PartyMember[]>;

  constructor() {
    this.members = PartyService.getPartyFromLS();
    PartyService.storePartyToLS(this.members);
    this.observable = new BehaviorSubject<PartyMember[]>(this.members);
  }

  public get length(): number {
    return this.members.length;
  }

  public save(): void{
    PartyService.storePartyToLS(this.members);
    this.observable.next(this.members);
  }

  public addDefaultParty(): void{
    this.members = PartyService.generateDefaultParty();
  }

  public contains(id: string): boolean{
    return this.members
      .filter(member => member.character_id === id)
      .length === 1;
    // for (const member of this.members){
    //   if (member.character_id === id){
    //     return true;
    //   }
    // }
    // return false;
  }

  private static generateDefaultParty(): PartyMember[] {

    const party = [];
    const defaultParty = ['traveler_anemo', 'amber', 'kaeya', 'lisa'];
    for (const member of defaultParty){
      const partyMember = new PartyMember(member);
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
