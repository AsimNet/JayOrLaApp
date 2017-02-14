import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Event } from '../models/event'

@Injectable()
export class User {
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
        if(res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


    /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

}