import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailEditPage } from './email-edit';

@NgModule({
  declarations: [
    EmailEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailEditPage),
  ],
  exports: [
    EmailEditPage
  ]
})
export class EmailEditPageModule {}
