import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-email-edit',
  templateUrl: 'email-edit.html',
})
export class EmailEditPage {
  user = {};
  jwt: string = '';
  id: string = '';
  emailForm: FormGroup;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.emailForm = this.formBuilder.group({
                  email: new FormControl(null, Validators.compose([
                    Validators.required
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailEditPage');
  };

  ionViewWillEnter() {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.id = user._id
    });
    this.storage.get('jwt').then(jwt => {
      this.jwt = jwt;
    });
  };

  saveData() {
    let email = this.emailForm.get('email').value;
    this.dataService.saveEmail({id: this.id, jwt: this.jwt, email: email})
    .map(res => res.json())
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Email updated successfully.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.storage.set('user', data);
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  };
};
