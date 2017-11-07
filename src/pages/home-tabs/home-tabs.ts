import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { DataService } from '../../providers/data-service/data-service';

declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html'
})
export class HomeTabsPage {
  user = {};
  jwt: string = "";
  id: string = "";
  pushId: string = "";
  notifications: any[] = [];

  alertRoot = 'AlertPage'
  helpRoot = 'HelpPage'
  settingRoot = 'SettingPage'
  infoRoot = 'InfoPage'
  friendsRoot = 'FriendsPage'


  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public toastCtrl: ToastController,
              public platform: Platform,
              public navParams: NavParams) {
    this.platform.ready().then(() => {
      // if(typeof FCMPlugin != 'undefined') {
        
      // };
      this.initializeApp();
    });
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabsPage');
  };

  initializeApp() {
    if(this.platform.is('android') || this.platform.is('ios')) {
      FCMPlugin.getToken( token => {
        console.log(token);
        this.pushId = token;
        this.storage.set('pushToken', token).then( data => {
          this.updatePushId();
        });
        }
      );
    };
  };

  updatePushId() {
    let id = ''
    let jwtToken = ''
    this.storage.get('user').then(user => {
      id = user._id;
      this.storage.get('jwt').then(jwt => {
        jwtToken = jwt;
        this.dataService.updatePushId({id: id, jwt: jwtToken, pushId: this.pushId})
        .map( res => res.json())
        .subscribe(
          data => {
            this.storage.set('user', data);
          },
          err => {
            let error = JSON.stringify(err);
            console.log(error);
          }
        );
      });
    });
  };
};
