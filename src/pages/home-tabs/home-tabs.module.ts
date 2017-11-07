import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTabsPage } from './home-tabs';
import { AlertPage } from '../alert/alert';

@NgModule({
  declarations: [
    HomeTabsPage,
    AlertPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTabsPage),
  ]
})
export class HomeTabsPageModule {}
