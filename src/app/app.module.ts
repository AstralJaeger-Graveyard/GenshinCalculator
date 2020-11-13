import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartymanagerComponent } from './partymanager/partymanager.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyComponent } from './partymanager/party/party.component';
import { CharacterComponent } from './partymanager/party/character/character.component';
import { CharacterDetailComponent } from './partymanager/character-detail/character-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PartymanagerComponent,
    HeaderComponent,
    SummaryComponent,
    ScheduleComponent,
    PartyComponent,
    CharacterComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
