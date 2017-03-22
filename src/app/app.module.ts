import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Clipboard } from '@ionic-native/clipboard';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { AddNewEventPage } from '../pages/add-new-event/add-new-event';
import { YayiPage } from '../pages/yayi/yayi';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { VotePage } from '../pages/vote/vote';
import { SettingsPage } from '../pages/settings/settings';

import {Analytics} from "../providers/analytics";
import { FabricErrorHandler } from '../providers/FabricErrorHandler'
import { User } from '../providers/user';
import { Api } from '../providers/api';
import { Events } from '../providers/events';
import { Database } from "../providers/database";
import {UtcToDate} from '../pipes/utc-to-date';
import {UnixToTime} from '../pipes/unix-to-time';


import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  SignupPage,
  TutorialPage,
  HomePage,
  AddNewEventPage,
  YayiPage,
  EventDetailsPage,
  VotePage,
  SettingsPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    StatusBar,
    SQLite,
    Clipboard,
    SplashScreen,
    SocialSharing,
    Network,
    Analytics,
    Events,
    User,
    Api,
    Database,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: FabricErrorHandler }
  ];
}

@NgModule({
  declarations: [declarations(), UtcToDate,UnixToTime],
  imports: [
    IonicModule.forRoot(MyApp,{
      mode: 'md'
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
