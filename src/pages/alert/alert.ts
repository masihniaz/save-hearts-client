import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';

import { Geolocation } from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';

import { EmergencyWaitingPage } from '../../pages/emergency-waiting/emergency-waiting';

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {
  user = {};
  id: string = '';
  jwt: string = '';

  location = {
    coordinates: [101.738534870263,3.24826391543084],
    type: 'Point'
  };

  constructor(public navCtrl: NavController,
              public dataService: DataService,
              public geolocation: Geolocation,
              public storage: Storage,
              public navParams: NavParams) {
                
                this.storage.get('user').then( user => {
                  this.user = user;
                  this.id = user._id;
                });
                this.storage.get('jwt').then( jwt => {
                  this.jwt = jwt;
                });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPage');
    

    this.geolocation.getCurrentPosition().then( location => {
      this.location.coordinates[0] = location.coords.longitude;
      this.location.coordinates[1] = location.coords.latitude;
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  };
  ionViewWillEnter() {
    
  }

  alertEmergency() {
    this.dataService.alertEmergency({id: this.id, jwt: this.jwt, location: this.location, user: this.user})
    .map( res => res.json())
    .subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.navCtrl.push(EmergencyWaitingPage, {users: data});
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  };

};
