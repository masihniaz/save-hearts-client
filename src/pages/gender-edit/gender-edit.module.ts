import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenderEditPage } from './gender-edit';

@NgModule({
  declarations: [
    GenderEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GenderEditPage),
  ],
  exports: [
    GenderEditPage
  ]
})
export class GenderEditPageModule {}
