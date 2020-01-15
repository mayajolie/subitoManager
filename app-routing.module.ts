import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'liste', loadChildren: './liste/liste.module#ListePageModule' },
  { path: 'entrepise', loadChildren: './entrepise/entrepise.module#EntrepisePageModule' },
  { path: 'inscription', loadChildren: './inscription/inscription.module#InscriptionPageModule' },
  { path: 'chauffeurs', loadChildren: './chauffeurs/chauffeurs.module#ChauffeursPageModule' },
  { path: 'ajout-client', loadChildren: './ajout-client/ajout-client.module#AjoutClientPageModule' },
  { path: 'reservations', loadChildren: './reservations/reservations.module#ReservationsPageModule' },
  { path: 'detail-entreprise', loadChildren: './detail-entreprise/detail-entreprise.module#DetailEntreprisePageModule' },
  { path: 'detai-chauffeur', loadChildren: './detai-chauffeur/detai-chauffeur.module#DetaiChauffeurPageModule' },
  { path: 'detail-user', loadChildren: './detail-user/detail-user.module#DetailUserPageModule' },
  { path: 'listpart', loadChildren: './listpart/listpart.module#ListpartPageModule' },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
