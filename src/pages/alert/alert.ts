import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';

import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';

// import { EmergencyWaitingPage } from '../../pages/emergency-waiting/emergency-waiting';

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
    coordinates: [62.2040287,34.352865],
    type: 'Point'
  };

  constructor(public navCtrl: NavController,
              public dataService: DataService,
              public geolocation: Geolocation,
              // public geoLocOpts: GeolocationOptions,
              public storage: Storage,
              public loadingCtrl: LoadingController,
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
    this.getLocation();
  };

  getLocation() {
    let opts: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0
    }
    this.geolocation.getCurrentPosition(opts).then( location => {
      // this.location.coordinates[0] = location.coords.longitude;
      // this.location.coordinates[1] = location.coords.latitude;
      this.location.coordinates.push(location.coords.longitude);
      this.location.coordinates.push(location.coords.latitude);
      console.log('Location: ', JSON.stringify(location));
      this.dataService.updateLocation({id: this.id, jwt: this.jwt, location: this.location}).
      subscribe(
        data => {
          console.log('Location Updated');
        },
        err => {
          console.log('Location update failed: ', JSON.stringify(err));
        }
      );
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  };

  alertEmergency() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubble',
      content: `<div>Processing Your Request</div>`
    });
    loading.present();
    this.dataService.alertEmergency({id: this.id, jwt: this.jwt, location: this.location, user: this.user})
    .map( res => res.json())
    .subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.navCtrl.push("EmergencyWaitingPage", {users: data});
        loading.dismiss();
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  };

};
