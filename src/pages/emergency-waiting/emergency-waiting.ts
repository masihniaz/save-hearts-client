import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-emergency-waiting',
  templateUrl: 'emergency-waiting.html',
})
export class EmergencyWaitingPage {

  users = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyWaitingPage');
  };

  ionViewWillEnter() {
    this.users = this.navParams.get('users');
  };

}
