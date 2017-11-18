import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { IntroPage } from '../pages/intro/intro'
// import { LoginPage } from '../pages/login/login';
declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";
  notifications : Array<any> = [];
  constructor(public platform: Platform,
              statusBar: StatusBar,
              public storage: Storage,
              public toastCtrl: ToastController,
              public keyboard: Keyboard,
              splashScreen: SplashScreen) {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.keyboard.disableScroll(true);
      this.initializeApp();
    });
  };

  initializeApp() {
    if(this.platform.is('android') || this.platform.is('ios')) {
      FCMPlugin.onNotification((data) => {
        if(data.wasTapped) {
          this.notifications.push(data);
          console.log(JSON.stringify(data));
          this.storage.set('notifications', this.notifications);

        } else {
          this.notifications.push(data);
          console.log(JSON.stringify(data));
          this.storage.set('notifications', this.notifications);
          // toast.present();
        };
      }); 
    };
  };

  ionViewWillEnter() {

  };
};

