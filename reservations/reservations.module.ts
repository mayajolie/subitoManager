import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservationsPage } from './reservations.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

const routes: Routes = [
  {
    path: '',
    component: ReservationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
