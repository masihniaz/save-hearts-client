import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  id: string = '';
  jwt: string = '';
  friends: any[] = [];
  defaultAvatar: string = 'assets/img/avatar.jpg';
  constructor(public navCtrl: NavController,
              public dataService: DataService,
              public storage: Storage,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }
  
  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      this.id = user._id;
      this.storage.get('jwt').then( jwt => {
        this.jwt = jwt;
        this.getFriends();
      });
    });
  };



  getFriends() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubble',
      content: '<div>Loading...</div>'
    });
    loading.present();
    let data = {
      id: this.id,
      jwt: this.jwt
    }

    this.dataService.getFriends(data)
    .map(res => res.json())
    .subscribe(
      data => {
        this.friends = data;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  };

  removeFriend(friend) {
    let data = {
      id: this.id,
      username: friend.username,
      jwt: this.jwt
    };
    let prompt = this.alertCtrl.create({
      title: 'Remove Friend',
      message: `Are you sure you want to remove ${friend.name}`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.dataService.removeFriend(data)
            .map(res => res.json())
            .subscribe(
              data => {
                let toast = this.toastCtrl.create({
                  message: 'Friend Removed',
                  duration: 2000,
                  position: 'middle'
                })
                toast.present();
                this.storage.set('user', data);
                this.getFriends();
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      ]
    });
    prompt.present();
  };

  addFriend() {
    let prompot = this.alertCtrl.create({
      title: 'Add Friend',
      message: 'Enter a USERNAME to add a friend',
      inputs: [
        {
          name: 'username',
          placeholder: 'username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: user => {
            let data = {
              id: this.id,
              username: user.username,
              jwt: this.jwt
              
            };
            this.dataService.addFriend(data)
            .map(res => res.json())
            .subscribe(
              data => {
                let toast = this.toastCtrl.create({
                  message: 'Friend Added',
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.storage.set('user', data);
                this.getFriends();
              },
              err => {
                let error = err.json();
                console.log(error.message);
                let toast = this.toastCtrl.create({
                  message: error.message,
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
              }
            );
          }
        }
      ]
    });
    prompot.present();
  };
  
  viewFriend(friend) {
    let modal = this.modalCtrl.create('ViewFriendModalPage', {friend: friend});
    modal.present();
  }

};
