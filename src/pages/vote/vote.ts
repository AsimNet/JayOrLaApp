import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ViewController, ModalController, App, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Events } from '../../providers/events';
import { User } from '../../models/user';
import { Response } from '@angular/http';
import { Network } from 'ionic-native'
import { Database } from "../../providers/database";
import 'moment/locale/ar-SA';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup'
/*
  Generated class for the Vote page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage {
  hashCode: string;
  createdBy: string;
  notes: string;
  endDate: string;
  eventName: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public app: App,
    public database: Database,
    public storage: Storage,
    public alertCtrl: AlertController, ) {
    this.hashCode = navParams.get("hashCode");
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: this.translate.instant("GETTING_DETAILS"),
    });
    loader.present();
    this.events.getEvent(this.hashCode).subscribe((resp: Response) => {
      //hide the loader: 
      loader.dismiss();

      let results = resp.json();
      this.createdBy = results.user_name;
      this.notes = results.notes;
      this.endDate = results.end_date;
      this.eventName = results.name;


    }, (err) => {
       //hide the loader: 
      loader.dismiss();
      
      //event doesn't exist!

      let prompt = this.alertCtrl.create({
        title: this.translate.instant("ERROR"),
        message: this.translate.instant("EVENT_DOESNT_EXIST"),
        buttons: [
          {
            text: this.translate.instant("DONE_BUTTON"),
            handler: (data) => {
              console.log('Saved clicked:' + data.newUserName);
              //Go back!
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  coming(isIt: boolean) {
    let loader = this.loadingCtrl.create({
      content: this.translate.instant("VOTING"),
    });
    loader.present();

    if (Network.type !== 'none') {
      //get User Object from Storage.
      this.storage.get(SignupPage.ACCOUNT_KEY).then((userDB) => {
        userDB.isComing = isIt;
        console.log("userDB: " + JSON.stringify(userDB));
        loader.dismiss();
        //here user clicked on either willCome button or wontCome.
        this.events.participate(userDB, this.hashCode).subscribe((resp) => {
          console.log(resp.json());
        }, (err) => {
          // error
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();

        });
      }).catch((err) => {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })

    } else {
      // no internet conncetion!
      let toast = this.toastCtrl.create({
        message: this.translate.instant("NO_NETWORK"),
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

  }
}
