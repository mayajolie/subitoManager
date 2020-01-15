import { Component, OnInit,NgZone,ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController,Platform, NavController  } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listpart',
  templateUrl: './listpart.page.html',
  styleUrls: ['./listpart.page.scss'],
})
export class ListpartPage{


  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { query: string; };
  destination: { input: string;};
  service : google.maps.DistanceMatrixService;

  autocompleteItems: any[];
  location: any;
  placeid: any;
  map:any;
  placesService
  saveDisabled
  maps
  mapp:google.maps.places.AutocompleteOptions;
  place
  distancefinel

  latitude: number = 0;
  longitude: number = 0;
  geo: any
  constructor(
    public zone: NgZone,private arouter:ActivatedRoute,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { query: '' };
    this.destination = {  input:'' };
    this.service = new google.maps.DistanceMatrixService();

    this.autocompleteItems = [];
  }
  
 
  updateSearchResults(){
    if (this.autocomplete.query == '' ) {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.query },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  adresseDestination(){
    if (this.destination.input == '' ) {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.destination.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  
  selectSearchResult(item) {
    console.log(item)
    this.location = item
    this.placeid = item.place_id;

     if (this.destination.input) {
      google.maps.event.addListener(item, 'destination.input',this.location);
      this.destination.input=item.description;
     
    }
      else if (this.autocomplete.query) {
        google.maps.event.addListener(item, 'autocomplete.query',this.location.place_id);
        this.autocomplete.query=item.description;
   
      }
     
      this.autocompleteItems = [];
     
}


get_rout(){
  
    console.log(this.destination.input);
    console.log(this.autocomplete.query);
  this.service.getDistanceMatrix({
  origins: [this.autocomplete.query],
  destinations: [this.destination.input],
  travelMode: google.maps.TravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.METRIC,
  avoidHighways: false,
  avoidTolls: false
}, function (response, status) {
  if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
     this.distance = response.rows[0].elements[0].distance.text;
     console.log(this.distance);

    this.distancefinel = this.distance.split(" ");
    this.distancefinel = this.distancefinel[0];
    this.distancefinel = this.distancefinel.replace(",",".");
    // Maj ; this.de 23h à 6H ==>  minimum 4000
     this.prix = Math.round(this.distancefinel)*300;
    if (this.prix < 3000) { this.prix = 3000; sessionStorage.setItem("prix", this.prix); } else { sessionStorage.setItem("prix", this.prix); }  //3000
    
    //$('#message').html(Math.round(this.distancefinel));
    
    console.log(this.prix);
     
    };
  })
}



}

