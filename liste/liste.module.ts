import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListePage } from './liste.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';

const routes: Routes = [
  {
    path: '',
    component: ListePage
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
  declarations: [ListePage]
})
export class ListePageModule {}
