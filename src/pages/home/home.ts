import { Component } from '@angular/core';
import { Event } from '../../models/event';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { Events } from '../../providers/events';
import { AddNewEventPage } from '../add-new-event/add-new-event';
import { Database } from '../../providers/database';
import { TranslateService } from 'ng2-translate/ng2-translate';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventsList: Event[] = [];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public translate: TranslateService,
    public database: Database,
    public platform: Platform) {

  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {

      this.database.getEvents().then((results) => {
        this.eventsList = results;
      })
    })
  }

  addNewEvent() {
    let addEventPage = this.modalCtrl.create(AddNewEventPage);
    addEventPage.present();
  }

  open(event: Event) {
    //user did click on an event on the list;

  }

  delete(event: Event){
    //user wants to delete an event from the list
    this.database.deleteEvent(event).then(()=>{
      let eventIndex = this.eventsList.indexOf(event);
      this.eventsList.splice(eventIndex,1)
    })
  }
}
