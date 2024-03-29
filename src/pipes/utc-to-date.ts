import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ar-SA';
import { MyApp } from '../app/app.component';

@Pipe({
  name: 'utcToDate'
})

@Injectable()

export class UtcToDate {
  
  transform(value, args) {
          console.log(value)
      let date = moment.unix(value);
      console.log(date)
      date.locale(MyApp.usersLanguage);
      let fromNow = moment(date).calendar();
    return fromNow;
  }
} 