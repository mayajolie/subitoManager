import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AuthentificationService} from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router :Router,
    private authen:AuthentificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.accueil();
    });
  }
  private login(){
    this.router.navigateByUrl('/login');
  }
  isAdmin(){
    return this.authen.isAdmin();
  }
  isUser(){
    return this.authen.isUse();
  }
 
  isAuthentificed(){
    return this.authen.isAuthentificed() ;
  }
  private accueil(){
    this.router.navigateByUrl('/menu/reservations');
  }
}
