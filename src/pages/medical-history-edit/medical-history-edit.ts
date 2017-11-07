import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../providers/data-service/data-service';


@IonicPage()
@Component({
  selector: 'page-medical-history-edit',
  templateUrl: 'medical-history-edit.html',
})
export class MedicalHistoryEditPage {
  user = {};
  jwt: string = '';
  id: string = '';
  medicalInfoForm: FormGroup;
  bloodTypes: Array<string>;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public dataService: DataService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
                this.medicalInfoForm = this.formBuilder.group({
                  bloodType: new FormControl(null, Validators.compose([
                    Validators.required
                  ])),
                  medicalNotes: new FormControl(null, Validators.compose([
                    Validators.required,
                    Validators.maxLength(500)
                  ]))
                });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalHistoryEditPage');
    this.bloodTypes = [
      'O +',
      'O -',
      'A +',
      'A -',
      'B +',
      'B -',
      'AB +',
      'AB -'
    ];
  };

  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      this.user = user;
      this.id = user._id;
    });
    
    this.storage.get('jwt').then(jwt => {
      this.jwt = jwt;
    });
  };
  
  saveData() {
    let bloodType = this.medicalInfoForm.get('bloodType').value;
    let medicalNotes = this.medicalInfoForm.controls.medicalNotes.value;

    this.dataService.saveMecialInfo({id: this.id, jwt: this.jwt, bloodType: bloodType, medicalNotes: medicalNotes})
    .map(res => res.json())
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Medical info updated succesfully.',
          duration: 2000,
          position: 'middle'
        });
        toast.present()
        this.storage.set('user', data);
      },
      err => {
        console.log(err);
      }
    );
  };
};