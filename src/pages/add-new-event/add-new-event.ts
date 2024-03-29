import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ViewController, ModalController, App } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Events } from '../../providers/events';
import { Event } from '../../models/event';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';
import { YayiPage } from '../yayi/yayi';
import { Response } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Database } from "../../providers/database";
import * as moment from 'moment';
import 'moment/locale/ar-SA';
import { MyApp } from '../../app/app.component';
/*
  Generated class for the AddNewEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-add-new-event',
  templateUrl: 'add-new-event.html'
})

export class AddNewEventPage {
  notes;
  dateTime = moment().locale('en').format();
  title;
  dateTimeString = moment(this.dateTime);
  private addEventError: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public toastCtrl: ToastController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public app: App,
    public database: Database,
    private network: Network) {
    this.translate.get('ADD_EVENT_ERROR').subscribe((value) => {
      this.addEventError = value;
console.log(this.dateTime)
    })
    this.dateTimeString.locale(MyApp.usersLanguage);

    // this.dateTime.locale(MyApp.usersLanguage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewEventPage');

  }

  storeDate() {
    this.dateTimeString = moment(this.dateTime);
    this.dateTimeString.locale(MyApp.usersLanguage);
  }


  addNewEvent() {
    if (this.title) {
      let loader = this.loadingCtrl.create({
        content: this.translate.instant("ADDING_EVENT"),
      });
      loader.present();
      if (this.network.type !== 'none') {

        this.storage.get(SignupPage.ACCOUNT_KEY).then((user) => {
          console.log(moment(this.dateTime).unix());
          let end_time = moment(this.dateTime).unix();
          let event = new Event(this.title, Number(user.id), Number(end_time), this.notes);
          this.events.addEvent(event).subscribe((resp: Response) => {
            //event created successfully
            loader.dismiss();
            if (resp.status == 200) {

              let results = resp.json();

              console.log("results: " + results);

              event.hash = results.hash;
              event.id = results.id;
              event.created_at = results.created_at;
              event.updated_at = results.updated_at;

              this.database.addToDB(event).then(() => {
                //show success message
                let modal = this.modalCtrl.create(YayiPage, {
                  Event: event
                }, {
                    showBackdrop: true
                  });
                modal.present({
                  animate: true
                })

              }).catch(() => {
                let toast = this.toastCtrl.create({
                  message: "ERROR: SQL",
                  duration: 4500,
                  position: 'top'
                });
                toast.present();
              });

            } else {
              loader.dismiss();
              let toast = this.toastCtrl.create({
                message: resp.status + " " + this.addEventError,
                duration: 4500,
                position: 'top'
              });
              toast.present();
            }


          }, (err) => {
            // error
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: this.addEventError,
              duration: 4500,
              position: 'top'
            });
            toast.present();

          });
          //  console.log("userId: " + userId + ", day: " + this.day + ", time: " + this.time + " zone: " + moment().format("Z"));
        });

      } else {
        // no internet conncetion!
        let toast = this.toastCtrl.create({
          message: this.translate.instant("NO_NETWORK"),
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    } else {

      let toast = this.toastCtrl.create({
        message: this.translate.instant("ALL_FIELDS_REQUIRED"),
        duration: 2500,
        position: 'top'
      });
      toast.present();

    }

  }

}
