import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartymanagerComponent } from './partymanager/partymanager.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyComponent } from './partymanager/party/party.component';
import { PartymemberComponent } from './partymanager/party/partymember/partymember.component';
import { PartymemberDetailComponent } from './partymanager/partymember-detail/partymember-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownDirective } from './directives/dropdown.directive';
import { RepeatDirective } from './directives/repeat.directive';
import { HttpClientModule } from '@angular/common/http';
import { PartyCockpitComponent } from './partymanager/party/party-cockpit/party-cockpit.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { de_DE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    PartymanagerComponent,
    HeaderComponent,
    SummaryComponent,
    ScheduleComponent,
    PartyComponent,
    PartymemberComponent,
    PartymemberDetailComponent,
    DropdownDirective,
    RepeatDirective,
    PartyCockpitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: de_DE }],
  bootstrap: [AppComponent]
})
export class AppModule { }
