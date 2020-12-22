import { Component, OnInit, isDevMode } from '@angular/core';
import {PartyService} from '../services/party.service';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public gAnalytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  onKoFiClick() {
    this.gAnalytics.event('ko-fi_click', 'Header', 'ko-fi');
  }

  onDiscordClick() {
    this.gAnalytics.event('discord_click', 'Header', 'discord_invite');
  }

  isDevMode(): boolean {
    return isDevMode()
  }
}
