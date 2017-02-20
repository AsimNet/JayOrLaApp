import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { Network } from 'ionic-native'
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string } = {
    name: ''
  };

  public static readonly ACCOUNT_KEY = 'ACCOUNT';

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    if(this.account.name.length > 2){
    let loader = this.loadingCtrl.create({
      content: this.translateService.instant("SIGNING_UP"),
    });
    loader.present();

    if (Network.type !== 'none') {
      let accountJsoned = JSON.stringify(this.account);
      console.log(accountJsoned);
      this.user.signup(accountJsoned).subscribe((resp) => {
        let results = JSON.stringify(resp)["_body"];

        if (resp.status == 200) {
          loader.dismiss();

          this.storage.set(SignupPage.ACCOUNT_KEY, results).then(() => {
            console.log("resp status: " + results);
            this.navCtrl.setRoot(MainPage, {}, {
              animate: true,
              direction: 'forward'
            });

          });
        } else {
          //something went wrong, like 500 code!

          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: resp.status + " " + this.loginErrorString,
            duration: 4500,
            position: 'top'
          });
          toast.present();
        }

      }, (err) => {
        console.error("doLogin error: " + err);
        //     // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        loader.dismiss();

      });
    }else{
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("NO_NETWORK"),
          duration: 3000,
          position: 'top'
        });
        toast.present();
      loader.dismiss();

    }
  }else{
    //less than 2 letters!
     let toast = this.toastCtrl.create({
          message: this.translateService.instant("FILL_REQUIRED"),
          duration: 3000,
          position: 'top'
        });
        toast.present();
  }
  }
}