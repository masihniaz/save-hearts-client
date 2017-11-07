import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  notifications: any[] = [];
  notificationsLength: number;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  };

  ionViewWillEnter() {
    this.storage.get('notifications').then( notifications => {
      if(notifications) {
        this.notifications = notifications;
        this.notificationsLength = notifications.length;
        // console.log(JSON.stringify(this.notifications));
      } else {
        this.notificationsLength = 0;
      }
    });
  };

  viewDisplayPicture(notification) {
    let modal = this.modalCtrl.create('ViewDisplayPictureModalPage', {dp: notification.dp});
    modal.present();
  };

};
