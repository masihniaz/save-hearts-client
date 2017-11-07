import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewFriendModalPage } from './view-friend-modal';

@NgModule({
  declarations: [
    ViewFriendModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewFriendModalPage),
  ],
  exports: [
    ViewFriendModalPage
  ]
})
export class ViewFriendModalPageModule {}
