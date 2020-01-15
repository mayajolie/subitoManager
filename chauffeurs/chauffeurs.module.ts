import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { ChauffeursPage } from './chauffeurs.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';


const routes: Routes = [
  {
    path: '',
    component: ChauffeursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChauffeursPage]
})
export class ChauffeursPageModule {}
