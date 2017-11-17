import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewNotificationPage } from './view-notification';

@NgModule({
  declarations: [
    ViewNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewNotificationPage),
  ],
  exports: [
    ViewNotificationPage
  ]
})
export class ViewNotificationPageModule {}
