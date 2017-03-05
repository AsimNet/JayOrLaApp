import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ViewController, ModalController, App } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Events } from '../../providers/events';
import { Event } from '../../models/event';
import { Response } from '@angular/http';
import { Network } from 'ionic-native'
import { Database } from "../../providers/database";
import * as moment from 'moment';
import 'moment/locale/ar-SA';
import { MyApp } from '../../app/app.component';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public app: App,
    public database: Database) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

}
