import { Component } from '@angular/core';
import { Event } from '../../models/event';
import { NavController, ModalController } from 'ionic-angular';
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
    public database: Database) {
    this.events.getEvent("0de71b6").subscribe((Data) => {
      console.log(Data.status + " " + Data.json());

    })

    this.database.getEvents().then((results) => {
      this.eventsList = results;
    })
  }


  addNewEvent() {
    let addEventPage = this.modalCtrl.create(AddNewEventPage);
    addEventPage.present();
  }
}
