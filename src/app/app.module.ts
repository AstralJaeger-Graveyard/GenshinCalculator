import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// Modules
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

// Components
import { AppComponent } from './app.component';
import { PartymanagerComponent } from './partymanager/partymanager.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyComponent } from './partymanager/party/party.component';
import { PartymemberComponent } from './partymanager/party/partymember/partymember.component';
import { MemberDetailComponent } from './partymanager/member-detail/member-detail.component';
import { ItemComponent } from './summary/item/item.component';
import { PortraitComponent } from './partymanager/member-detail/portrait/portrait.component';
import { MemberHeaderComponent } from './partymanager/member-detail/member-header/member-header.component';
import { FooterComponent } from './footer/footer.component';

// Directives
import { RepeatDirective } from './directives/repeat.directive';
import { MediaDirective } from './directives/media.directive';

// Pipes
import { FormatNumberPipe } from './pipes/format-number.pipe';

// I18 localizations
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// Fontawesome Icons
import { fas } from '@fortawesome/pro-solid-svg-icons';

// Services
import { CharacterService } from './services/character.service';
import { PartyService } from './services/party.service';
import { MaterialService } from './services/material.service';
import { MemberNavComponent } from './partymanager/member-detail/member-nav/member-nav.component';
import { WeaponService } from './services/weapon.service';
import { LocalizationService } from './services/localization.service';

// environment
import { environment } from '../environments/environment';

//Needs to be sorted

registerLocaleData(en);

@NgModule({
  declarations: [
    RepeatDirective,
    AppComponent,
    PartymanagerComponent,
    HeaderComponent,
    SummaryComponent,
    ScheduleComponent,
    PartyComponent,
    PartymemberComponent,
    MemberDetailComponent,
    MemberHeaderComponent,
    ItemComponent,
    PortraitComponent,
    MemberNavComponent,
    MediaDirective,
    FormatNumberPipe,
    FooterComponent
  ],
  imports: [
    ImagekitioAngularModule.forRoot({
      publicKey: environment.imagekit_publickey,
      urlEndpoint: environment.imagekit_url_endpoint
    }),
    NgcCookieConsentModule.forRoot({
      cookie: {
        domain: environment.cookie_domain
      },
      palette: {
        popup: {
          background: '#000'
        },
        button: {
          background: '#f1d600'
        }
      },
      theme: 'edgeless',
      type: 'opt-out',
      content:{
        message: 'By using our site, you acknowledge that you accept the usage of cookies '
      }
    }),
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    ScrollingModule,
    DragDropModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
     LocalizationService,
     MaterialService,
     CharacterService,
     WeaponService,
     PartyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
      library.addIconPacks(fas);
  }
}
