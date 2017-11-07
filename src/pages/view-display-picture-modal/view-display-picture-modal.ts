import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-display-picture-modal',
  templateUrl: 'view-display-picture-modal.html',
})
export class ViewDisplayPictureModalPage {
  defaultAvatar: string = 'assets/img/avatar.jpg'
  dp: string = '';
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.dp = this.navParams.get('dp');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDisplayPictureModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  };

}
