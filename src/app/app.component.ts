import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { VotePage } from '../pages/vote/vote';
import { HomePage } from '../pages/home/home';

import { Storage } from '@ionic/storage';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { Database } from "../providers/database";

@Component({
  template: `<ion-nav #content [root]="rootPage" dir="{{dirr}}"></ion-nav>`
})
export class MyApp {
  rootPage;
  public static usersLanguage;
  public static dir: string;
  public dirr: string;

  @ViewChild(Nav) nav: Nav;



  constructor(translate: TranslateService,
    private platform: Platform,
    private config: Config,
    public storage: Storage,
    public database: Database,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let browserLang = translate.getBrowserLang();

      if (browserLang === 'ar') {
        MyApp.dir = "rtl";
        this.dirr = "rtl";
      } else {
        MyApp.dir = "ltr";
        this.dirr = "ltr";

      }

      // Set the default language for translation strings, and the current language.
      translate.setDefaultLang('en');
      MyApp.usersLanguage = translate.getBrowserCultureLang();
      translate.use(browserLang);
      console.log("translate.getBrowserCultureLang(): " + MyApp.usersLanguage + " translate.getBrowserLang(): " + browserLang)
      translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get(SignupPage.ACCOUNT_KEY).then((user) => {
        console.log("USER REGISTERATION STATUS: " + user);
        if (!user) {
          //show him tutorial..
          this.rootPage = TutorialPage;
        } else {
          //show him main page
          this.rootPage = HomePage;
        }
      });

    });


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  ngAfterViewInit() {
    this.platform.ready().then(() => {
      // Convenience to route with a given nav
      this.deeplinks.routeWithNavController(this.nav, {
        '/participate/:hashCode': VotePage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
    })
  }
}
