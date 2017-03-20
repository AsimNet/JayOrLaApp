import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ar-SA';
import { MyApp } from '../app/app.component';
/*
  Generated class for the UnixToTime pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'UnixToTime'
})
@Injectable()
export class UnixToTime {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
      console.log(value)
      let date = moment.unix(value);
      console.log(date)
      date.locale(MyApp.usersLanguage);
      let fromNow = moment(date).fromNow();
    return fromNow;
  }
}
