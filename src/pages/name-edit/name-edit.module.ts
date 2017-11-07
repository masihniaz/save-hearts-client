import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NameEditPage } from './name-edit';

@NgModule({
  declarations: [
    NameEditPage,
  ],
  imports: [
    IonicPageModule.forChild(NameEditPage),
  ],
  exports: [
    NameEditPage
  ]
})
export class NameEditPageModule {}
