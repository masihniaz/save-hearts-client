import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-gender-edit',
  templateUrl: 'gender-edit.html',
})
export class GenderEditPage {
  user = {};
  jwt: string = '';
  id: string = '';
  genders: Array<string>;
  gender: string;
  genderForm: FormGroup;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.genderForm = this.formBuilder.group({
                  gender: new FormControl(null, Validators.compose([
                    Validators.required
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenderEditPage');
  };
  ionViewWillEnter() {
    this.genders =[
      "Male",
      "Female"
      
    ];
    this.storage.get('user').then(user => {
      this.user = user;
      this.id = user._id;
      this.gender = user.gender;
    });
    this.storage.get('jwt').then(jwt => {
      this.jwt = jwt;
    })
  };
  saveData() {
    let gender = this.genderForm.get('gender').value;
    this.dataService.saveGender({id: this.id, jwt: this.jwt, gender: gender})
    .map(res => res.json())
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Gender updated successfully.',
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
