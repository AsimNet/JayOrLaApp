import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class Api {

  url: string = 'https://JayOrLa.xyz';

  constructor(public http: Http) { }



get(endpoint: string) {
      let options = new RequestOptions();

    return this.http.get(this.url + '/' + endpoint, options);
  }

    post(endpoint: string, body: any) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/' + endpoint, body, options);
  }

   handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}