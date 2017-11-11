import { Component } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         LoadingController,
         ToastController } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';
// import { SignupPage } from '../signup/signup'
import { HomeTabsPage } from '../home-tabs/home-tabs';

// import { IntroPage } from '../intro/intro';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  userData = {}
  userId = '';
  auth_token: string;

  logoSettings = {
    'imgURL': 'assets/img/logo.png',
    'width' : 100,
    'height' : 100
  };

  loadingOpts = {
    spinner: 'bubbles',
    content: `<div>Signing in...</div>`};

  backgroundImage: string = "assets/img/bg.jpg";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataService: DataService, 
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public toastCtrl: ToastController) {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  };

  ionViewWillEnter() {
    
  };

  ionViewCanEnter() {
    this.storage.get('intro-done').then( done => {
      if(!done) {
        this.navCtrl.setRoot("IntroPage");
        this.storage.set('intro-done', true);
        return false;
      } else {
        this.storage.get('jwt').then(jwt => {
          if(jwt) {
            this.navCtrl.setRoot(HomeTabsPage);
            return false;
          } else {
            // let login page to display
            return true;
          }
        });
      };
    });
  };

  login() {
    let loading = this.loadingCtrl.create(this.loadingOpts);
    loading.present();
    this.dataService.login(this.username, this.password)
                    .map(res => res.json())
                    .subscribe(
                      data => {

                        this.auth_token = data.token;
                        let splitToken = this.auth_token.split(' ');
                        let jwt = splitToken[1];
                        this.storage.set('jwt', jwt);
                        let jwtData = jwt.split('.');
                        let payload = jwtData[1];
                        let decryptedPayload = JSON.parse(window.atob(payload));
                        this.userData = decryptedPayload._doc;
                        this.userId = decryptedPayload._doc._id;
                        this.storage.set('user', this.userData).then( user => {

                          this.navCtrl.setRoot(HomeTabsPage);
                          loading.dismiss();

                        });
                      },
                      err => {
                        loading.dismiss();
                        let error = err.json();
                        let toast = this.toastCtrl.create({'message': error.message,
                                                           'duration': 2000,
                                                           'position': 'middle'});
                        toast.present();
                      }
                    );
  };

  signUp(): void{
    this.navCtrl.push("SignupPage");
  };
};
