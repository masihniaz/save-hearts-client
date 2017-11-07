import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDisplayPictureModalPage } from './view-display-picture-modal';

@NgModule({
  declarations: [
    ViewDisplayPictureModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDisplayPictureModalPage),
  ],
  exports: [
    ViewDisplayPictureModalPage
  ]
})
export class ViewDisplayPictureModalPageModule {}
