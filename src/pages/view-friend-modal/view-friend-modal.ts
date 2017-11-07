import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-friend-modal',
  templateUrl: 'view-friend-modal.html',
})
export class ViewFriendModalPage {
  defaultAvatar: string = 'assets/img/avatar.jpg';
  friend: any = {};
  birthdate: string;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
                this.friend = this.navParams.get('friend');
                let ISOBirthdate = String(this.friend.birthdate);
                this.birthdate = ISOBirthdate.split('T')[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewFriendModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
