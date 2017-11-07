import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirthdateEditPage } from './birthdate-edit';

@NgModule({
  declarations: [
    BirthdateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BirthdateEditPage),
  ],
  exports: [
    BirthdateEditPage
  ]
})
export class BirthdateEditPageModule {}
