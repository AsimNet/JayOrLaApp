import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { Storage } from '@ionic/storage';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { Database } from "../providers/database";

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;
  public static usersLanguage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: TutorialPage },
    { title: 'Tabs', component: TabsPage }
  ]

  constructor(translate: TranslateService,
    platform: Platform,
    config: Config,
    public storage: Storage,
    public database: Database) {
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    MyApp.usersLanguage = translate.getBrowserCultureLang();
    translate.use(translate.getBrowserLang());
    console.log("translate.getBrowserCultureLang(): " + MyApp.usersLanguage + " translate.getBrowserLang(): " + translate.getBrowserLang())
    translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.createDB();

      this.storage.get(SignupPage.ACCOUNT_KEY).then((user) => {
        console.log("USER REGISTERATION STATUS: " + user);
        if (!user) {
          //show him tutorial..
          this.rootPage = TutorialPage;
        } else {
          //show him main page
          this.rootPage = TabsPage;
        }
      });

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private createDB(): void {

    Database.db.openDatabase(Database.DB_LOCATION).then(Database.create)
      .catch((err) => {
        console.error('Unable to crate database @MyApp.createDb: ', err);
      });
  }
}
