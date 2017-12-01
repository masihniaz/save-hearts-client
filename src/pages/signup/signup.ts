import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

// IMPORTS FOR CREATING A MODEL DRIVEN FORM IN RX @ 
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

// IMPORTS FOR MOBILE NUMBER VALIDATION USING GOOGLE-LIBPHONENUMBER @ https://github.com/ruimarinho/google-libphonenumber
import { PhoneNumberUtil, PhoneNumberType, PhoneNumberFormat } from 'google-libphonenumber';

// IMPORTS FOR NGX-VALIDATORS @ https://github.com/Nightapes/ngx-validators
import { PasswordValidators, UniversalValidators } from 'ngx-validators';

// IMPORTS FOR CUSTOM VALIDATIONS FROM NG2-VALIDATION @ https://github.com/yuyang041060120/ng2-validation
import { CustomValidators } from 'ng2-validation';

// IMPORTS FOR RENDERING FORM ERROR MESSAGES
import { validation_messages } from '../../models/form_validation_messages';

import { HomeTabsPage } from '../home-tabs/home-tabs';
import { User } from '../../models/user.model';

import { DataService } from '../../providers/data-service/data-service';

// import { Observable }  from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user = new User();
  auth_token: string;
  user_data = {};
  
  location = {
    coordinates: [],
    type: 'Point'
  };

  loadingOpts = {
    spinner: 'bubbles',
    content: `<div>Please Wait...</div>`
  };

  // GOOGLE-LIBPHONENUMBER SERVICE FOR MOBILE NUMBER VALIDATION.
  phoneUtil = PhoneNumberUtil.getInstance();
  PNF = PhoneNumberFormat;

  signUpForm: FormGroup;
  genders: Array<string>;
  validation_messages = validation_messages;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dataService: DataService,
              public geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage
              ) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.genders = [
      'Male',
      'Female'
    ];
    let password = new FormControl('', Validators.compose([
      Validators.required,
      UniversalValidators.noWhitespace,
      UniversalValidators.minLength(6),
      UniversalValidators.maxLength(20),
      PasswordValidators.repeatCharacterRegexRule(4),
      PasswordValidators.alphabeticalCharacterRule(1),
      PasswordValidators.digitCharacterRule(1),
      PasswordValidators.lowercaseCharacterRule(1),
      PasswordValidators.uppercaseCharacterRule(1),
      PasswordValidators.specialCharacterRule(1),
    ]));
    let confirm_password = new FormControl('', [
      Validators.required,
      CustomValidators.equalTo(password)
    ]);

    this.signUpForm = this.formBuilder.group({
      username: new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
      ])),
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])),
      lastname: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])),
      gender: new FormControl(this.genders[0], Validators.compose([
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        CustomValidators.email
      ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
        this.phoneValidator
      ])),
      birthdate: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      // Address: this.formBuilder.group({
      //   country: new FormControl(null, Validators.compose([
      //     Validators.required,
      //   ])),
      //   city: new FormControl(null, Validators.compose([
      //     Validators.required,
      //   ])),
      //   zipcode: new FormControl(null, Validators.compose([
      //     Validators.required,
      //   ])),
      //   address: new FormControl(null, Validators.compose([
      //     Validators.required,

      //   ]))
      // }),
      password: password,
      confirm_password: confirm_password
    });
    console.log(this.signUpForm);
    let opts: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0
    }
    this.geolocation.getCurrentPosition(opts).then( location => {
      this.location.coordinates[0] = location.coords.longitude;
      this.location.coordinates[1] = location.coords.latitude;
    }).catch( err => {
      console.log(JSON.stringify(err));
    });
  };

  phoneValidator = (control: AbstractControl) : {[key: string] : boolean} => {
      if(!control.value) return null;
      // INPUT MUST BE GREATER THAN 1 IN ORDER TO CALL THE GOOGLE-LIBPHONENUMBER API OTHERWISE IT RETURNS THE INPUT IS NOT A PHONE NUMBER.
      if(control.value.length == 1) return {'phone': true};
      if(control.value.length > 1) return this.phoneUtil.isPossibleNumberForType(this.phoneUtil.parse(control.value, 'MY'), PhoneNumberType.MOBILE)? null : {'phone':true};
    };

  getUserData() {
      this.user.username = this.signUpForm.get('username').value;
      this.user.name = this.signUpForm.get('name').value;
      this.user.lastname = this.signUpForm.get('lastname').value;
      this.user.email = this.signUpForm.get('email').value;
      this.user.birthdate = this.signUpForm.get('birthdate').value;
      this.user.gender = this.signUpForm.get('gender').value;
      this.user.phone = this.signUpForm.get('phone').value;
      this.user.password = this.signUpForm.get('password').value;
      this.user.geometry = this.location;
      // this.user.geometry = [0,0];
  };

  signUp() {
      let loading = this.loadingCtrl.create(this.loadingOpts);
      loading.present()
      this.getUserData();
      this.dataService.register(this.user)
                      .map(res => res.json())
                      .subscribe(
                        data => { 
                        let toast = this.toastCtrl.create({
                          'message': 'Account Created Successfully!',
                          'duration': 3000,
                          'position': 'middle'});
                        loading.dismiss();
                        toast.present();
                        let jwt = data.token.split(' ')[1];
                        this.user_data = data.user;
                        this.auth_token = data.token;
                        this.storage.set('user', this.user_data);
                        this.storage.set('jwt', jwt);
                        this.navCtrl.setRoot(HomeTabsPage);
                      });
  };
};
