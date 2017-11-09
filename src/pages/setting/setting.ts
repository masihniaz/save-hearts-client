import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, AlertController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { NameEditPage } from '../name-edit/name-edit';
import { BirthdateEditPage } from '../birthdate-edit/birthdate-edit';
import { GenderEditPage } from '../gender-edit/gender-edit';
import { EmailEditPage } from '../email-edit/email-edit';
import { PhoneEditPage } from '../phone-edit/phone-edit';
import { EmergencyContactEditPage } from '../emergency-contact-edit/emergency-contact-edit';
import { MedicalHistoryEditPage } from '../medical-history-edit/medical-history-edit';

import { DataService } from '../../providers/data-service/data-service';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  user = {};
  id: String = '';
  jwt: String = '';
  birthdate: string;
  defaultAvatar: string = 'assets/img/avatar.jpg';
  
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public appCtrl: App,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public dataService: DataService,
              public navParams: NavParams) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  };

  ionViewDidEnter() {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.id = user._id;
      let ISOBirthdate = String(user.birthdate);
      this.birthdate = ISOBirthdate.split('T')[0];
    });
    this.storage.get('jwt').then( (jwt) => {
      this.jwt = jwt;
    });
    
  }

  editName() {
    this.navCtrl.push(NameEditPage);
  };

  editBirthdate() {
    this.navCtrl.push(BirthdateEditPage);
  };

  editGender() {
    this.navCtrl.push(GenderEditPage);
  };

  editEmail() {
    this.navCtrl.push(EmailEditPage);
  };

  editPhone() {
    this.navCtrl.push(PhoneEditPage);
  };

  editEmergencyContact() {
    this.navCtrl.push(EmergencyContactEditPage);
  };

  editMedicalHistory() {
    this.navCtrl.push(MedicalHistoryEditPage);
  };

  presentActionSheet() {
    console.log('Action Sheet clicked!');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            // this.takePicture()
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            // this.takePicture()
          }
        },
        {
          text: 'Remove Picture',
          handler: () => {
            // dismiss the action sheet manually
            actionSheet.dismiss().then(() => {
              this.removeProfilePicture();
            })
            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  removeProfilePicture() {
    let data = {
      id: this.id,
      jwt: this.jwt
    };
    let prompot = this.alertCtrl.create({
      title: 'Remove Display Photo',
      message: 'Are you sure you want remove your display photo',
      buttons: [
        {
          text: 'Cancel',
          handler : () => {
            console.log('Clicked Cancel');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.dataService.removeProfilePicture(data)
            .map(res => res.json())
            .subscribe(
              data => {
                let toast = this.toastCtrl.create({
                  message: 'Profile Photo Removed Successfuly',
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.user = data;
                this.storage.set('user', data);
              },
              err => {
                let error = err.json();
                let message = error.message;
                let toast = this.toastCtrl.create({
                  message: message,
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
  // takePicture(sourceType) {

  // }

  logout() {
    let data = {
      id: this.id,
      jwt: this.jwt
    };

    this.dataService.deleteLocation(data)
    .subscribe(
      done => {
        console.log('Location deleted');
        this.dataService.deletePushId(data)
        .subscribe(
          done => {
            console.log('FCM token deleted');
              // remove user data from local storage
              this.storage.remove('user');
              this.storage.remove('jwt');
              this.storage.remove('pushToken');
              this.storage.remove('notifications');
              // redirect to login and remove the tab bar.
              this.appCtrl.getRootNav().setRoot(LoginPage);
          },
          err => {
            console.log('Deleting FCM toekn failed: ', JSON.stringify(err));
          }
        )
      },
      err => {
        console.log('Deleting location failed: ', JSON.stringify(err));
      }
    );

  };

};

