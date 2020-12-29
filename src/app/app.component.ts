import {Component, OnInit, OnDestroy, isDevMode} from '@angular/core';
import {NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent} from "ngx-cookieconsent";
import { Subscription } from "rxjs";
import {PartyService} from "./services/party.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  public showAds: boolean = false;

  private favIcon: HTMLLinkElement = document.querySelector('#appIcon');

  constructor(private ccService: NgcCookieConsentService,
              private party: PartyService,
              private title: Title) { }

  ngOnInit(): void {

    console.log(`Version: ${environment.version.substr(environment.version.length - 6, 6)}`);

    if(isDevMode()){
      this.title.setTitle("[Local] GenshinCalculator");
      this.favIcon.href = '/assets/favicon_dev.ico';
    }

    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {

    });
    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(()=>{

    });
    this.initializeSubscription = this.ccService.initialize$.subscribe((event: NgcInitializeEvent) => {

    });
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(()=>{
        if(this.ccService.hasConsented()){
          // TODO: save other necessary things to localstorage
          this.party.save();
        } else {
          localStorage.clear();
        }
    });
    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(()=>{

    })
    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent)=>{

    })
  }

  ngOnDestroy(): void {

    // unsubscripe to cookie consent subscriptions
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
