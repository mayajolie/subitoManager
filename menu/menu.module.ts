import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      { path: 'details/:id/:table', loadChildren: '../details/details.module#DetailsPageModule' },
      { path: 'liste', loadChildren: '../liste/liste.module#ListePageModule' },
      { path: 'reservations', loadChildren: '../reservations/reservations.module#ReservationsPageModule' },
      { path: 'detail-entreprise/:id', loadChildren: '../detail-entreprise/detail-entreprise.module#DetailEntreprisePageModule' },
      { path: 'detai-chauffeur/:id', loadChildren: '../detai-chauffeur/detai-chauffeur.module#DetaiChauffeurPageModule' },
      { path: 'detail-user/:id', loadChildren: '../detail-user/detail-user.module#DetailUserPageModule' },    
      { path: 'entrepise', loadChildren: '../entrepise/entrepise.module#EntrepisePageModule' },
      { path: 'inscription', loadChildren: '../inscription/inscription.module#InscriptionPageModule' },
      { path: 'chauffeurs', loadChildren: '../chauffeurs/chauffeurs.module#ChauffeursPageModule' },
      { path: 'ajout-client', loadChildren: '../ajout-client/ajout-client.module#AjoutClientPageModule' },

    
    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
