import {Injectable, isDevMode} from '@angular/core';
import { PartyMember } from '../model/PartyMember';
import {BehaviorSubject, Observable} from 'rxjs';
import {NgcCookieConsentService} from "ngx-cookieconsent";
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class PartyService{

  private static LS_KEY = 'party_v2';

  public members: PartyMember[] = [];

  public observable: BehaviorSubject<PartyMember[]>;

  constructor(private ccService: NgcCookieConsentService) {

    this.members = this.loadParty();
    this.saveParty(this.members);
    this.observable = new BehaviorSubject<PartyMember[]>(this.members);
  }

  public get length(): number {
    return this.members.length;
  }

  public save(): void{
    this.saveParty(this.members);
    this.observable.next(this.members);
  }

  public contains(id: string): boolean{
    return this.members
      .filter(member => member.characterId === id)
      .length === 1;
  }

  public defaultParty(): PartyMember[] {
    return ['traveler_anemo', 'amber', 'kaeya', 'lisa']
      .map(characterId => new PartyMember(characterId));
  }

  private loadParty(): PartyMember[] {

    localStorage.removeItem('party');
    let localParty: PartyMember[] = JSON.parse(localStorage.getItem(PartyService.LS_KEY));
    if (!localParty){
      localParty = this.defaultParty();
    }

    this.checkPartyValidity(localParty);
    return localParty;
  }

  private saveParty(party: PartyMember[]): void{
    localStorage.setItem(PartyService.LS_KEY, JSON.stringify(party));
  }

  private checkPartyValidity(localParty: PartyMember[]): void{
    for (const {index, value} of localParty.map((v, i) => ({index: i, value: v}))){
      if (value.artifacts === undefined || value.artifacts === null){
        localParty[index].artifacts = [];
      }
    }
  }
}
