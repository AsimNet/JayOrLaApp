import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ar-SA';
import { MyApp } from '../app/app.component';

/*
  Generated class for the ApiDateToString pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'apiDateToString'
})
@Injectable()
export class ApiDateToString {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
 let dateUTC = moment.utc(value,'yyyy-MM-dd hh:mm:ss');
 console.log(dateUTC);
        dateUTC.locale(MyApp.usersLanguage);
        
    return dateUTC.fromNow();
  }
}
