import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjoutClientPage } from './ajout-client.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutClientPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjoutClientPage]
})
export class AjoutClientPageModule {}
