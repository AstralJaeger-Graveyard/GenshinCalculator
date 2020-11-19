import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgZorroAntdModule} from './ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';

// Components
import { AppComponent } from './app.component';
import { PartymanagerComponent } from './partymanager/partymanager.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyComponent } from './partymanager/party/party.component';
import { PartymemberComponent } from './partymanager/party/partymember/partymember.component';
import { PartymemberDetailComponent } from './partymanager/partymember-detail/partymember-detail.component';

// Directives
import { RepeatDirective } from './directives/repeat.directive';

// I18 localizations
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import en from '@angular/common/locales/en';

// Zorro Icons
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

// Fontawesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {faBell, faStar} from '@fortawesome/pro-solid-svg-icons';
import {CharacterService} from './services/character.service';
import {PartyService} from './services/party.service';
import {LoggingService} from './services/logging.service';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

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
    RepeatDirective
  ],
  imports: [
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
    {provide: NZ_ICONS, useValue: icons},
     CharacterService,
     PartyService,
     LoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faBell);
  }
}
