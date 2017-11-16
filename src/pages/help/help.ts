import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  notifications: any[] = [];
  notificationsLength: number;
  map: GoogleMap;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public googleMaps: GoogleMaps,
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

  loadMap(lng, lat) {
    // let location = new LatLng(lat, lng);
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18
      }
    };
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element, mapOptions);
    // this.map = new GoogleMap('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
    // .subscribe(() => {
    //   console.log('map is ready')
    // });
    .then(() => {
      console.log('map is ready');
      this.map.addMarker({
        title: 'Victim',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: lat,
          lng: lng
        }
      }).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
        .subscibe(() => {
          alert('clicked');
        });
      });
    });
  };

};
