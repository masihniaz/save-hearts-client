import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewLocationPage } from './view-location';

@NgModule({
  declarations: [
    ViewLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewLocationPage),
  ],
  exports: [
    ViewLocationPage
  ]
})
export class ViewLocationPageModule {}
