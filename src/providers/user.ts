import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class User {
  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('register', accountInfo).share();

    return seq;
  }


  /**
 * changing userName
 */
  changeUserName(userHashAndName: any) {
    let seq = this.api.post('changeName', {
      hash: userHashAndName.hash,
      new_user_name: userHashAndName.name
    }).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);

      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  
}