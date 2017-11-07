import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { MyApp } from './app.component';

import { IntroPage } from '../pages/intro/intro'
import { LoginPage } from '../pages/login/login'
import { SignupPage } from '../pages/signup/signup'
import { DataService } from '../providers/data-service/data-service';
import { HomeTabsPage } from '../pages/home-tabs/home-tabs';

import { NameEditPage } from '../pages/name-edit/name-edit';
import { BirthdateEditPage } from '../pages/birthdate-edit/birthdate-edit';
import { GenderEditPage } from '../pages/gender-edit/gender-edit';
import { EmailEditPage } from '../pages/email-edit/email-edit';
import { PhoneEditPage } from '../pages/phone-edit/phone-edit';
import { EmergencyContactEditPage } from '../pages/emergency-contact-edit/emergency-contact-edit';
import { MedicalHistoryEditPage } from '../pages/medical-history-edit/medical-history-edit';

import { EmergencyWaitingPage } from '../pages/emergency-waiting/emergency-waiting';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    LoginPage,
    SignupPage,
    HomeTabsPage,
    NameEditPage,
    BirthdateEditPage,
    GenderEditPage,
    EmailEditPage,
    PhoneEditPage,
    EmergencyContactEditPage,
    MedicalHistoryEditPage,
    EmergencyWaitingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    SignupPage,
    LoginPage,
    HomeTabsPage,
    NameEditPage,
    BirthdateEditPage,
    GenderEditPage,
    EmailEditPage,
    PhoneEditPage,
    EmergencyContactEditPage,
    MedicalHistoryEditPage,
    EmergencyWaitingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,
    Geolocation
  ]
})
export class AppModule {}
