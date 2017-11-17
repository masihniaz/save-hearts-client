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
  constructor(public navCtrl: NavController,
              public googleMaps: GoogleMaps,
              public navParams: NavParams) {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    // this.loadMap(this.lat, this.lng);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewLocationPage');
  }

  loadMap(lat, lng) {
    console.log('loadmap called');
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
        console.log('marker clicked');
        marker.on(GoogleMapsEvent.MARKER_CLICK)
        .subscibe(() => {
          alert('clicked');
        });
      });
    });
  };

}
