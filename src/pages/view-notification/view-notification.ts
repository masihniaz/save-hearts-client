import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-notification',
  templateUrl: 'view-notification.html',
})
export class ViewNotificationPage {
  notification = {}
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
    this.notification = this.navParams.get('notification');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotificationPage');
  };

  viewDisplayPicture(notification) {
    let modal = this.modalCtrl.create('ViewDisplayPictureModalPage', {dp: notification.dp});
    modal.present();
  };

  viewLocation(lat, lng, name, lastname) {
    this.navCtrl.push('ViewLocationPage', {lat: lat, lng: lng, name: name, lastname: lastname });
  };

}
