import { Component } from '@angular/core';
import {Event} from '../../models/event';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events: Event[] =[] ;
  constructor(public navCtrl: NavController) {
    for(let i =0;i<43;i++){
let event = new Event("HI"+i+200,2,"32323232323","Hello");
    this.events.push(event);
    }
  }

}
