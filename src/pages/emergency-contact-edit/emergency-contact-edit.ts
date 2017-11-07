import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-emergency-contact-edit',
  templateUrl: 'emergency-contact-edit.html',
})
export class EmergencyContactEditPage {
  user = {};
  jwt: string = '';
  id: string = '';
  emergencyContactForm: FormGroup;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.emergencyContactForm = this.formBuilder.group({
                  emergencyContact: new FormControl(null, Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(12)
                  ]))
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyContactEditPage');
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.id = user._id;
    });
    this.storage.get('jwt').then(jwt => {
      this.jwt = jwt;
    });
  };

  saveData() {
    let emergencyContact = this.emergencyContactForm.get('emergencyContact').value;
    this.dataService.saveEmergencyContact({id: this.id, jwt: this.jwt, emergencyContact: emergencyContact})
    .map(res => res.json())
    .subscribe(
      data  => {
        let toast = this.toastCtrl.create({
          message: 'Emergency Contact Updated Successfully.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.storage.set('user', data);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  };

}
