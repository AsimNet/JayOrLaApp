import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,App } from 'ionic-angular';
import { Event } from '../../models/event';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Clipboard } from 'ionic-native';
/*
  Generated class for the Yayi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-yayi',
  templateUrl: 'yayi.html'
})
export class YayiPage {

  public event: Event

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public translate: TranslateService,
    public app: App) {
    this.event = this.navParams.get("Event")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YayiPage');
  }
  dismiss() {
    Clipboard.copy("https://JayOrLa.xyz/participate/"+this.event.hash).then(()=>{
      this.viewCtrl.dismiss().then(()=>{
    this.app.getRootNav().popToRoot();

      })


    });

  }
}
