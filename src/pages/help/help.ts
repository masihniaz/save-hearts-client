import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';

declare var FCMPlugin;
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  defaultAvatar: string = 'assets/img/avatar.jpg';
  notifications: any[] = [];
  notificationsLength: number = this.notifications.length;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public platform: Platform,
              public navParams: NavParams) {
                this.platform.ready().then(()=> {
                  this.initializeApp();
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  };

  ionViewWillEnter() {
    // this.storage.get('notifications').then( notifications => {
    //   if(notifications) {
    //     this.notifications = notifications;
    //     this.notificationsLength = notifications.length;
    //     // console.log(JSON.stringify(this.notifications));
    //   } else {
    //     this.notificationsLength = 0;
    //   }
    // });
  };

  initializeApp() {
    if(this.platform.is('android') || this.platform.is('ios')) {
      FCMPlugin.onNotification((data) => {
        if(data.wasTapped) {
          this.notifications.push(data);
          console.log(JSON.stringify(data));
          // this.storage.set('notifications', this.notifications);

        } else {
          this.notifications.push(data);
          console.log(JSON.stringify(data));
          // this.storage.set('notifications', this.notifications);
          // toast.present();
        };
      }); 
    };
  };

  viewNotification(notification) {
    this.navCtrl.push("ViewNotificationPage", {notification: notification});
  };

  removeNotification(index) {
    for(let i = index; i < this.notifications.length; i++) {
      this.notifications[i] = this.notifications[i+1];
    }
    this.notifications.pop();
    this.storage.set('notifications', this.notifications);
  };
};
