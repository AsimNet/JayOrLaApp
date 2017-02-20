import { Component } from '@angular/core';
import { Event } from '../../models/event';
import { NavController, ModalController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { AddNewEventPage } from '../add-new-event/add-new-event';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  HU: Event[] = [];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events) {
    this.events.getEvent("0de71b6").subscribe((Data) => {
      console.log(Data.status + " " + Data.json());

    })
    for (let i = 0; i < 43; i++) {
      let event = new Event("HI" + i + 200, 2, "32323232323", "Hello");
      this.HU.push(event);
    }
  }


  addNewEvent() {
    let addEventPage = this.modalCtrl.create(AddNewEventPage,{},{
      enableBackdropDismiss: true,
      showBackdrop: true
    });
    addEventPage.present();
  }
}
