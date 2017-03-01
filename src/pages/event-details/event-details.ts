import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/events'
import { TranslateService } from 'ng2-translate/ng2-translate';
import { User } from '../../providers/user'

/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  segment = 'willCome';
  event;
  usersList: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events,
    public translate: TranslateService) {

    this.event = navParams.get("event");
  }

  ionViewWillEneter() {
    console.log(this.event)
    this.events.getAllParticipantToEvent(this.event).subscribe((resp) => {
      console.log(resp.json());
    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }
  shareEvent() {

  }
}
