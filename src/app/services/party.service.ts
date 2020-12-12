import {Injectable, isDevMode} from '@angular/core';
import { PartyMember } from '../model/PartyMember';
import {BehaviorSubject, Observable} from 'rxjs';
import {NgcCookieConsentService} from "ngx-cookieconsent";

@Injectable({
  providedIn: 'root'
})
export class PartyService{

  private static LS_KEY = 'party';

  public members: PartyMember[] = [];

  public observable: BehaviorSubject<PartyMember[]>;

  constructor(private ccService: NgcCookieConsentService) {
    if(ccService.hasConsented()) {
      this.members = this.loadParty();
      this.saveParty(this.members);
    }
    this.observable = new BehaviorSubject<PartyMember[]>(this.members);
  }

  public get length(): number {
    return this.members.length;
  }

  public save(): void{
    if(this.ccService.hasConsented()) {
      this.saveParty(this.members);
    }
    this.observable.next(this.members);
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

  public defaultParty(): PartyMember[] {
    return ['traveler_anemo', 'amber', 'kaeya', 'lisa']
      .map(characterId => new PartyMember(characterId));
  }

  private loadParty(): PartyMember[] {
    let localParty = JSON.parse(localStorage.getItem('party'));
    if (!localParty){
      localParty = this.defaultParty();
    }
    return localParty;
  }

  private saveParty(party: PartyMember[]): void{
    localStorage.setItem(PartyService.LS_KEY, JSON.stringify(party));
  }
}
