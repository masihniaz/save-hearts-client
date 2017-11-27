import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, MapType} from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
declare var google;
@IonicPage()
@Component({
  selector: 'page-view-location',
  templateUrl: 'view-location.html',
})
export class ViewLocationPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: GoogleMap;
  lat: any;
  lng: any;
  name: string;
  lastname: string;
  constructor(public navCtrl: NavController,
              // public googleMaps: GoogleMaps,
              public geolocation: Geolocation,
              public navParams: NavParams) {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.name = this.navParams.get('name');
    this.lastname = this.navParams.get('lastname');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewLocationPage');
    this.loadMap();
    this.getMyLocation();
  }
  getMyLocation() {
    let options: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options)
    .then(location => {
      let originLatLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      this.startNavigating(originLatLng);
    });
  };
  // loadMap() {
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: this.lat,
  //         lng: this.lng
  //       },
  //       zoom: 15,
  //     },
  //     mapType: 'MAP_TYPE_ROADMAP'
  //   };
  //   this.map = GoogleMaps.create('map', mapOptions);
  //   // this.map.one(GoogleMapsEvent.MAP_READY)
  //   // .then(() => {
  //   //   console.log('map is ready');
  //   //   this.map.setAllGesturesEnabled(true);
  //   //   this.map.setMyLocationEnabled(true);
  //   //   this.map.addMarker({
  //   //     title: `${this.name } ${this.lastname}`,
  //   //     icon: 'red',
  //   //     animation: 'DROP',
  //   //     position: {
  //   //       lat: lat,
  //   //       lng: lng
  //   //     }
  //   //   })
  //   //   .then( marker => {
  //   //   });
  //   // });
  // };
  loadMap(){
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
  startNavigating(originLatLng) {
    let destinationlatLng = new google.maps.LatLng(this.lat, this.lng);
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    directionsService.route({
      origin: originLatLng,
      destination: destinationlatLng,
      travelMode: 'DRIVING'
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.log(JSON.stringify(status));
      }
    })
  };
};
