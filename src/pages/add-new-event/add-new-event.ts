import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Events } from '../../providers/events';
import { Event } from '../../models/event';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the AddNewEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

interface Window {
  plugins: any;
  cordova: any;
}
declare var plugin;
declare var window: Window;


@Component({
  selector: 'page-add-new-event',
  templateUrl: 'add-new-event.html'
})

export class AddNewEventPage {
  day;
  time;
  notes;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public storage: Storage) { }
var moment = require('moment');
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewEventPage');
  }


  addNewEvent() {
    var userId = "0";
    this.storage.get(SignupPage.ACCOUNT_KEY).then((user) => {
      userId = user.id;
      console.log(this.day);
      console.log("userId: " + userId + ", day: " + this.day + ", time: " + this.time);
    });
    let dateTime = new Date();
    dateTime.setHours(this.time);
    dateTime.setDate(this.day);
    
    console.log(dateTime);
    //this.events.addEvent(new Event(event.name, userId,event.))
  }
}
