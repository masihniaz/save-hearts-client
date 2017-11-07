import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyWaitingPage } from './emergency-waiting';

@NgModule({
  declarations: [
    EmergencyWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyWaitingPage),
  ],
  exports: [
    EmergencyWaitingPage
  ]
})
export class EmergencyWaitingPageModule {}
