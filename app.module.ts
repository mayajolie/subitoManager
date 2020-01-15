import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SuperTabsModule } from '@ionic-super-tabs/angular'
import { IonicSelectableModule } from 'ionic-selectable';

import { AutoCompleteModule } from 'ionic4-auto-complete';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Network, NetworkOriginal } from '@ionic-native/network';
import { networkInterfaces } from 'os';
import { Geolocation } from '@ionic-native/geolocation';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,SuperTabsModule.forRoot(), SuperTabsModule,
    IonicSelectableModule,AutoCompleteModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
