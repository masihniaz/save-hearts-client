import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyContactEditPage } from './emergency-contact-edit';

@NgModule({
  declarations: [
    EmergencyContactEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyContactEditPage),
  ],
  exports: [
    EmergencyContactEditPage
  ]
})
export class EmergencyContactEditPageModule {}
