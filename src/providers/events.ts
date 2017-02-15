import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Event } from '../models/event'
import {User} from '../models/user';

@Injectable()
export class Events {
  _user: any;

  constructor(public http: Http, public api: Api) {
  }



  delete(event: Event) {

  }


  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  addEvent(event: Event) {
    let seq = this.api.post('event', event).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {

        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  /**
   * GET request to our event endpoint with the hash
   * that we pbtained when the user select an event from the list on the first page.
   */
  getEvent(hash: string) {
    let seq = this.api.get('event2/' + hash).share();
    console.log(seq);
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in

        console.log(JSON.stringify(res));
        console.log(res["name"])
        if (res.status == 'success') {

        }
      }, err => {
        console.error('ERROR: ', err);
      });

    return seq;
  }

participate(user: User, eventId: number){
  let seq = this.api.post('participate', {
    name: user.getName,
    is_coming: user.isComing,
    event_id: eventId
  }).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if(res.status == 'success') {

        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
}

  getAllParticipantToEvent(event: Event) {
    let seq = this.api.get('event/' + event.getEventId).share();
    console.log(seq);
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in

        console.log(JSON.stringify(res));
        console.log(res["name"])
        if (res.status == 'success') {

        }
      }, err => {
        console.error('ERROR: ', err);
      });

    return seq;
  }

}