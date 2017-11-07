import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneEditPage } from './phone-edit';

@NgModule({
  declarations: [
    PhoneEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneEditPage),
  ],
  exports: [
    PhoneEditPage
  ]
})
export class PhoneEditPageModule {}
