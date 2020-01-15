import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailEntreprisePage } from './detail-entreprise.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEntreprisePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailEntreprisePage]
})
export class DetailEntreprisePageModule {}
