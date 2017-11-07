import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  male: boolean = false;
  female : boolean = false;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public navParams: NavParams) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    
    this.storage.get('user').then( (user) => {
      
      if(user.gender == 'Male') {
        this.male = true;
      }
      else {
        this.female = true;
      };
    });
  };
};
