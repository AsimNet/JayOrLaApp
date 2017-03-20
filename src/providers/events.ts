import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Event } from '../models/event'
import { Storage } from '@ionic/storage'
import { SignupPage } from '../pages/signup/signup'
@Injectable()
export class Events {

  constructor(public http: Http, public api: Api, public storage: Storage) {
  }


  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  addEvent(event: Event) {
    let enhancedEventObj = {
      event: event.getName,
      user_id: event.getUser_id,
      end_date: event.getEndDate,
      notes: event.getNotes
    }
    let seq = this.api.post('event', enhancedEventObj).share();

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
  getEvent(hash: string,user) {

      console.log(JSON.stringify(user));
      let seq = this.api.get('event2/' + hash + "?uuid=" + user.uuid).share();
      console.log(seq);
      seq
        .map(res => res.json())
        .subscribe(res => {
          // If the API returned a successful response, mark the user as logged in

          console.log(JSON.stringify(res));
          if (res["participants"].length >= 1) {
          }
          if (res.status == 'success') {

          }
        }, err => {
          console.error('ERROR: ', err);
        });




    return seq;

  }

  participate(user, hashCode: string) {
    let enhancedEventObj = {
      name: user.name,
      is_coming: user.isComing,
      hash: hashCode,
      uuid: user.uuid
    }
    console.log("participate()"+hashCode+" : user: "+ JSON.stringify(user))
    let seq = this.api.post('participate',enhancedEventObj).share();

    seq
      .map(res => res.text())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
    
      }, err => {
        console.error('ERROR::: ', err);
      });

    return seq;
  }

  getAllParticipantToEvent(event: Event) {
    let seq = this.api.get('event/' + event.getHash).share();
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

  /**
   * Send a DELETE request to our Event endpoint with the event's hash you want to delete!
   * 
   */
  deleteEvent(event: Event, user) {
    //get User_hash
    console.log(event.getHash + " " + user.hash);
    let body = {
      event_hash: event.getHash,
      user_hash: user.hash
    }

    let seq = this.api.delete('event', body).share();

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
}