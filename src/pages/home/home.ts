import { Component } from '@angular/core';
import { Event } from '../../models/event';
import { NavController, ModalController, Platform, AlertController, App } from 'ionic-angular';
import { Events } from '../../providers/events';
import { AddNewEventPage } from '../add-new-event/add-new-event';
import { Database } from '../../providers/database';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public static  eventsList: Event[] = [];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public database: Database,
    public app: App,
    public platform: Platform) {

  }

get eventsList(){
    return HomePage.eventsList;
}
  loadEventsList() {
    this.platform.ready().then(() => {

      this.database.getEvents().then((results) => {

        HomePage.eventsList = results;
      })
    })
  }
  ionViewWillEnter() {
   // this.loadEventsList();
    console.log("CAME BACK!")
  }
  addNewEvent() {
    let nav = this.app.getRootNav();
    nav.push(AddNewEventPage);
  }

  open(event: Event) {
    //user did click on an event on the list;

  }

  delete(event: Event) {
    //user wants to delete an event from the list
    let alert = this.alertCtrl.create({
      title: this.translate.instant("WARNING"),
      subTitle: this.translate.instant("YOU_WANT_DELETE") + " " + event.getName,
      buttons: [{
        text: this.translate.instant("CANCEL_BUTTON")
      },
      {
        text: this.translate.instant("DELETE_BUTTON"),
        handler: () => {
          this.database.deleteEvent(event).then(() => {
            let eventIndex = HomePage.eventsList.indexOf(event);
            HomePage.eventsList.splice(eventIndex, 1);
          })
        }
      }]
    });
    alert.present();
  }
}
