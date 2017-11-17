import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  defaultAvatar: string = 'assets/img/avatar.jpg';
  notifications: any[] = [];
  notificationsLength: number;
  constructor(public navCtrl: NavController,
              public storage: Storage,
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

  viewNotification(notification) {
    this.navCtrl.push("ViewNotificationPage", {notification: notification});
  };

  removeNotification(notification) {

  };
};
