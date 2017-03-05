import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Events } from '../../providers/events'
import { TranslateService } from 'ng2-translate/ng2-translate';
import { User } from '../../models/user'
import { Network, SocialSharing } from 'ionic-native'

/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  segment = 'willCome';
  event;
  usersList: User[] = [];
  showOnly: User[] = [];
  loader;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public events: Events,
    public translate: TranslateService) {

    this.event = navParams.get("event");
  }

  updateList() {
    if (this.usersList) {

      if (this.segment === 'willCome') {
        //show users who are comign!
        this.showOnly = this.usersList.filter(userObj => userObj.isComing == true);
      } else if (this.segment === 'wontCome') {
        //show useres who aren't coming!
        this.showOnly = this.usersList.filter(userObj => userObj.isComing == false);
      }
      console.log("showOnly: " + this.showOnly)

    }
  }
  ionViewWillLeave() {
    //dismiss all loaders!
    this.loader.dismiss();
  }
  ionViewWillEnter() {
    console.log(this.event)
    this.loader = this.loadingCtrl.create({
      content: this.translate.instant("GETTING_DETAILS"),
    });
    this.loader.present();
    console.log(Network.type);
    if (Network.type !== 'none') {
      this.events.getAllParticipantToEvent(this.event).subscribe((resp) => {
        console.log(resp.text());
        JSON.parse(resp.text()).forEach((userApi) => {
          let userD: User = new User(userApi.name, userApi.id, userApi.is_coming, userApi.created_at, userApi.updated_at, userApi.ip, userApi.event_id);
          this.usersList.push(userD);

        });
        this.loader.dismiss();
        this.updateList();
      })
      console.log(this.usersList);
      this.updateList();
    } else {
      //there's no internet connection!
      this.loader.dismiss();
      let toast = this.toastCtrl.create({
        message: this.translate.instant("NO_NETWORK"),
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }
  shareEvent() {
    let url:string = "https://JayOrLa.xyz/participate/" + this.event.hash;
    SocialSharing.share(url, 'JayOrLa',null,null);

  }
}
