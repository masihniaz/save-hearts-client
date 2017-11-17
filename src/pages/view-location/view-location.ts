import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps'
@IonicPage()
@Component({
  selector: 'page-view-location',
  templateUrl: 'view-location.html',
})
export class ViewLocationPage {
  map: GoogleMap;
  lat: any;
  lng: any;
  name: string;
  lastname: string;
  constructor(public navCtrl: NavController,
              // public googleMaps: GoogleMaps,
              public navParams: NavParams) {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.name = this.navParams.get('name');
    this.lastname = this.navParams.get('lastname');
    this.loadMap(this.lat, this.lng);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewLocationPage');
  }

  loadMap(lat, lng) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 15
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('map is ready');
      this.map.addMarker({
        title: `${this.name } ${this.lastname}`,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: lat,
          lng: lng
        }
      })
      .then( marker => {
      });
    });
  };
};
