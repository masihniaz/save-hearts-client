import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { DataService } from '../../providers/data-service/data-service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-birthdate-edit',
  templateUrl: 'birthdate-edit.html',
})
export class BirthdateEditPage {
  user = {};
  id: string = '';
  jwt: string = '';
  birthdateForm: FormGroup;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.birthdateForm = this.formBuilder.group({
                  birthdate: new FormControl(null, Validators.compose([
                    Validators.required
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad BirthdateEditPage');
  };
  ionViewWillEnter() {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.id = user._id;
    });
    this.storage.get('jwt').then( jwt => {
      this.jwt = jwt;
    })
  };
  saveData() {
    let birthdate = this.birthdateForm.get('birthdate').value;
    this.dataService.saveBirthdate({id: this.id, jwt: this.jwt, birthdate: birthdate})
    .map(res => res.json())
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Birthdate updated successfuly.',
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
