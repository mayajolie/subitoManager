import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  tarif;
  rnavette;
  timepicker = new Date().toString();
  date = new Date().toString();
  code: any;
  pnom: any;
  idUser: any;
  adresse: any;
  email: any;
  telephone: any;
  data: any ;
  bag: any ;
  perso: any ;
  turbaim: any ;
  region: any ;
  chauf;
  prix;
  prix_u;
  prix_r;

  distance;
  relationship;
  countryCode_na : any;
  myDate = new Date().toISOString();
    GoogleAutocomplete: google.maps.places.AutocompleteService;
    autocomplete: { query: string; };
    destination: { input: string;};
    depart_r:{query: string;};
    arriver:{input:string; };
    service: google.maps.DistanceMatrixService;
    autocompleteItems: any[];
    autocompletDes:any[];
    autocompleteDepart: any [];
    autocompleteAr: any [];
    location: any;
    placeid: any;
    map: any;
    placesService;
    saveDisabled;
    maps;
    mapp: google.maps.places.AutocompleteOptions;
    place ;
    distancefinel;
    constructor(
      public zone: NgZone, private arouter: ActivatedRoute, private router: Router , private apiService: ApiService,
    )
     {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { query: '' };
      this.destination = {  input:'' };
      this.depart_r = { query: ''};
      this.arriver = {  input:'' };
      this.service = new google.maps.DistanceMatrixService();
      this.autocompleteItems = [];
      this.autocompletDes = [];
      this.autocompleteDepart =[];
      this.autocompleteAr = [];

    }
    ngOnInit() {
      document.getElementById('choix1').style.display = 'block';
      document.getElementById('choix2').style.display="none";
      document.getElementById('choix3').style.display="none";
    }
    choix2() {
      document.getElementById('choix2').style.display="block";
      document.getElementById('choix1').style.display="none";
      document.getElementById('choix3').style.display="none";
    }
    choix3() {
      document.getElementById('choix3').style.display="block";
      document.getElementById('choix1').style.display="none";
      document.getElementById('choix2').style.display="none";
    }
    //============================================ MAP TRANSFERT URBAIM=====================//
    updateSearchResults() {
      if (this.autocomplete.query === '' ) {
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
    adresseDestination() {
      if (this.destination.input === '' ) {
        this.autocompletDes = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.destination.input },
      (predictions, status) => {
        this.autocompletDes = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompletDes.push(prediction);
          });
        });
      });
    }
    selectSearchResult(item) {
      console.log(item);
      this.location = item;
      this.placeid = item.place_id;
            this.autocomplete.query=item.description;
        this.autocompleteItems = [];
  }
  selectDestination(item) {
    console.log(item);
    this.location = item;
    this.placeid = item.place_id;
          this.destination.input=item.description;
      this.autocompletDes = [];
}
    get_rout() {
      console.log(this.destination.input);
      console.log(this.autocomplete.query);
      this.service.getDistanceMatrix({
    origins: [this.autocomplete.query],
    destinations: [this.destination.input],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status !== 'ZERO_RESULTS') {
       this.distance = response.rows[0].elements[0].distance.text;
       console.log(this.distance);
       this.distancefinel = this.distance.split(' ');
       this.distancefinel = this.distancefinel[0];
       this.distancefinel = this.distancefinel.replace(',','.');
        // Maj ; this.de 23h à 6H ==>  minimum 4000
       this.prix = Math.round(this.distancefinel)*300; sessionStorage.setItem("distance", this.distancefinel)
       if (this.prix < 3000) {
       this.prix = 3000; 
       //sessionStorage.setItem("prix", this.prix);
       }else{
          sessionStorage.setItem("prix", this.prix); }  //3000
      //$('#message').html(Math.round(this.distancefinel));
      } ;
      document.getElementById('prix_u').innerHTML = this.prix
      document.getElementById('distance_u').innerHTML = this.distancefinel

    });
    //this.prix_u=document.getElementById('prix-u').getElementsByTagName('input')[0].value;

      //this.prix = sessionStorage.getItem("prix");
      this.distance = sessionStorage.getItem("distance");
      console.log(this.prix, this.distance);
  }

  //======================================= MAP TRANSFERT REGIONS ============================//
  updateSearchDepart() {
    if (this.depart_r.query === '' ) {
      this.autocompleteDepart = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.depart_r.query },
    (predictions, status) => {
      this.autocompleteDepart = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteDepart.push(prediction);
        });
      });
    });
  }
  adresseArriver() {
    if (this.arriver.input === '' ) {
      this.autocompleteAr = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.arriver.input },
    (predictions, status) => {
      this.autocompleteAr = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteAr.push(prediction);
        });
      });
    });
  }
  selectDepart_r(item) {
    console.log(item);
    this.location = item;
    this.placeid = item.place_id;
          this.depart_r.query=item.description;
      this.autocompleteDepart = [];
}
selectArrriver_r(item) {
  console.log(item);
  this.location = item;
  this.placeid = item.place_id;
        this.arriver.input=item.description;
    this.autocompleteAr = [];
}
  get_routRegion() {
    console.log(this.depart_r.query);
    console.log(this.arriver.input);

    this.service.getDistanceMatrix({
  origins: [this.depart_r.query],
  destinations: [this.arriver.input],
  travelMode: google.maps.TravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.METRIC,
  avoidHighways: false,
  avoidTolls: false
}, function(response, status) {
  if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status !== 'ZERO_RESULTS') {
     this.distance = response.rows[0].elements[0].distance.text;
     console.log(this.distance);
     this.distancefinel = this.distance.split(' ');
     this.distancefinel = this.distancefinel[0];
     this.distancefinel = this.distancefinel.replace(',','.');

    this.vehicule=document.getElementById('vehicule_r').getElementsByTagName('input')[0].value;
console.log(this.vehicule)
if (this.vehicule == "Berline") { if (this.distancefinel <= 200) { this.prix_r = (350) * Math.round(this.distancefinel); } else { this.prix_r = (300) * Math.round(this.distancefinel); } } 
else if (this.vehicule == "4X4") {  this.prix_r = (500) * Math.round(this.distancefinel); } 
else if (this.vehicule == "MB8P") { this.prix_r = (900) * Math.round(this.distancefinel); } 
else if (this.vehicule == "MB13P") {  this.prix_r = (1000) * Math.round(this.distancefinel); } 
else if (this.vehicule == "Bus16P") { this.prix_r = (1050) * Math.round(this.distancefinel); } 
else if (this.vehicule == "Bus26P") { this.prix_r = (1200) * Math.round(this.distancefinel); }
      // Maj ; this.de 23h à 6H ==>  minimum 4000
  }
    document.getElementById('prix_r').innerHTML = this.prix_r
    document.getElementById('distance_r').innerHTML = this.distancefinel

  });

}

    option(id,pnom,adresse,email,telephone){
        this.idUser = id;
        this.pnom=pnom;
        this.adresse=adresse;
        this.email=email;
        this.telephone=telephone;
        console.log(id,pnom,adresse,email,telephone);
     }
    info(data){
      console.log(data.pnom);
      const dat={
        pnom: data.pnom
      }
      console.log(dat);
      this.apiService.info(dat)
     .subscribe(
       res => {
         this.code=res;
         console.log(this.code)
        },
    
       err => console.log(err)
     )
     }
    estimtarif(data) {
     this.apiService.estimtarif(data)
     .subscribe( res => {
      this.tarif=res;
      console.log(this.tarif) ;
      console.log(this.code);
     },
       err =>{
         console.log(err)
         if (err.error. MESSAG) {
           Swal.fire(err.error. MESSAG)
         }
       } 
     )
  }
  
    navette(data) {
      this.arouter.params.subscribe((tata:any)=>{
      this.idUser = tata.id;
      this.pnom=tata.pnom;
      this.email=tata.email;
      this.telephone=tata.telephone;
      this.adresse=tata.adresse;
      console.log(this.idUser);
  
    });
  this.option(this.idUser,this.pnom,this.adresse,this.email,this.telephone)
  console.log(this.idUser);
  
     this.apiService.navette(data,this.idUser)
     .subscribe(
       tata =>  {this.rnavette=tata;
       console.log(this.rnavette);
     },
       err =>{
         console.log(err)
         if (err.error. MESSAG) {
           Swal.fire(err.error. MESSAG)
         }
        
       } 
     )
  }
  taxiu(data) {
    this.arouter.params.subscribe((tata:any)=>{
    this.idUser = tata.id;
    this.pnom=tata.pnom;
    this.email=tata.email;
    this.telephone=tata.telephone;
    this.adresse=tata.adresse;
    console.log(tata);
  });
  console.log(this.prix)
   this.apiService.taxiu(data)
   .subscribe(
     tata =>  {this.turbaim
     console.log(tata) ,
     this.info(this.code)
   },
     err =>{
       console.log(err)
       if (err.error. MESSAG) {
         Swal.fire(err.error. MESSAG)
       }
      
     } 
   )
  }
  
  regions(data) {
    this.arouter.params.subscribe((tata:any)=>{
    this.idUser = tata.id;
    this.pnom=tata.pnom;
    this.email=tata.email;
    this.telephone=tata.telephone;
    this.adresse=tata.adresse;
    console.log(tata);
  });
   this.apiService.regions(data)
   .subscribe(
     tata =>  {this.region
     console.log(tata)
   },
     err =>{
       console.log(err)
       if (err.error. MESSAG) {
         Swal.fire(err.error. MESSAG)
       }
      
     } 
   )
  }
  Personne(data){
     this.perso=data.nbre_personne
    console.log(this.perso);
    
  }
  
  Bagage(data){
      this.bag= data.bagage
  
    console.log(this.bag);
    }
  
  
  }