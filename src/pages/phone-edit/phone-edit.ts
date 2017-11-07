import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-phone-edit',
  templateUrl: 'phone-edit.html',
})
export class PhoneEditPage {
  user = {};
  jwt: string = '';
  id: string = '';
  phoneForm: FormGroup;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.phoneForm = this.formBuilder.group({
                  phone: new FormControl(null, Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(12)
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneEditPage');
  };
  
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
    let phone = this.phoneForm.get('phone').value;
    this.dataService.savePhone({id: this.id, jwt: this.jwt, phone: phone})
    .map(res => res.json())
    .subscribe(
      data  => {
        let toast = this.toastCtrl.create({
          message: 'Phone number updated successfully.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.storage.set('user', data);
      },
      err => {
        console.log(err);
      }
    );
  };
};
