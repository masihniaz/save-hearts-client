import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DataService } from '../../providers/data-service/data-service';

import { User } from '../../models/user.model';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-name-edit',
  templateUrl: 'name-edit.html',
})
export class NameEditPage {
  user = {};
  jwt: string = "";
  id: string = "";
  nameForm: FormGroup;
  
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.nameForm = this.formBuilder.group({
                  name: new FormControl(null, Validators.compose([
                    Validators.required,
                  ])),
                  lastname: new FormControl(null, Validators.compose([
                    Validators.required,
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad NameEditPage');
    
  };

  ionViewWillEnter() {
    this.storage.get('user').then( (user) => {
    this.user = user;
    this.id = user._id;
    });
    this.storage.get('jwt').then( jwt => {
      this.jwt = jwt;
    })
  };
  saveData() {
    let name = this.nameForm.get('name').value;
    let lastname = this.nameForm.get('lastname').value;
    this.dataService.saveName({id: this.id, jwt: this.jwt, name: name, lastname: lastname})
    .map(res => res.json())
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Name updatd successfuly.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.storage.set('user', data);
    },
      err => {
      console.log(err);
    });
  };
};
