import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalHistoryEditPage } from './medical-history-edit';

@NgModule({
  declarations: [
    MedicalHistoryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalHistoryEditPage),
  ],
  exports: [
    MedicalHistoryEditPage
  ]
})
export class MedicalHistoryEditPageModule {}
