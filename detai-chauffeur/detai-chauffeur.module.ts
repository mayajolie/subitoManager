import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetaiChauffeurPage } from './detai-chauffeur.page';

const routes: Routes = [
  {
    path: '',
    component: DetaiChauffeurPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetaiChauffeurPage]
})
export class DetaiChauffeurPageModule {}
