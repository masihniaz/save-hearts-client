import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-notification',
  templateUrl: 'view-notification.html',
})
export class ViewNotificationPage {
  notification = {}
  birthdate = '';
  formatedBirthdate = '';
  defaultAvatar: string = 'assets/img/avatar.jpg'
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
    this.notification = this.navParams.get('notification');
    this.birthdate = this.navParams.get('birthdate');
    this.formatedBirthdate = this.birthdate.split('T')[0];
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
