import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, App, LoadingController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup'
import { SocialSharing } from '@ionic-native/social-sharing';
import { User } from '../../providers/user'
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userAccount: { name: string, hash: string } = { name: " ", hash: " " };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public database: Database,
    public platform: Platform,
    public storage: Storage,
    public userAPI: User,
    public loadingCtrl: LoadingController) {
    this.storage.get(SignupPage.ACCOUNT_KEY).then((userObj) => {
      this.userAccount = userObj;
    })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changeUserName() {

    let prompt = this.alertCtrl.create({
      title: this.translate.instant("CHANGE_YOUR_NAME"),
      message: this.translate.instant("TYPE_NEW_NAME"),
      inputs: [
        {
          name: 'newUserName',
          value: this.userAccount.name
        },
      ],
      buttons: [
        {
          text: this.translate.instant("CANCEL_BUTTON"),
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant("SAVE_BUTTON"),
          handler: (data) => {
            let loader = this.loadingCtrl.create({
              content: this.translate.instant("WAIT"),
            });
            loader.present();

            console.log('Saved clicked:' + data.newUserName);
            //call API to change the name first, then change it locally!.
            this.userAPI.changeUserName(this.userAccount).subscribe((resp) => {
              //status: 200 OK
              console.log("Hello my new name is: " + this.userAccount.name);
              //hide loader:
              loader.dismiss();

              console.log("Hello my hash is: " + this.userAccount.hash);
              this.userAccount.name = data.newUserName;

              //save the name into local database
              this.storage.set(SignupPage.ACCOUNT_KEY, this.userAccount).then(() => {


              });
            }, (err) => {
              loader.dismiss();


            })


          }
        }
      ]
    });
    prompt.present();
  }

  twitterAccount() {
    SocialSharing.shareViaTwitter("@JayOrLa ");
  }

  emailSupport() {
    SocialSharing.shareViaEmail(null, "Support", ["Support@JayOrLa.xyz"], null, ["hlh132132@gmail.com", "sohib6@gmail.com"]);
  }

  restorePurchase() {

  }
}
