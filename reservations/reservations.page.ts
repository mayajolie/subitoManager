import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
timepicker=new Date().toString();
date=new Date().toString();
code:any;
pnom:any;
id_user
adresse
email
telephone
data
bag
perso
turbaim
region
chauf
prix;
distance;

myDate: String = new Date().toISOString();

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
    public zone: NgZone,private arouter:ActivatedRoute,private router:Router ,private apiService: ApiService
  )
   {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { query: '' };
    this.destination = {  input:'' };
    this.service = new google.maps.DistanceMatrixService();

    this.autocompleteItems = [];
  }
  
  ngOnInit() {
  
    
    document.getElementById('choix1').style.display="block";
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
     this.prix = Math.round(this.distancefinel)*300; sessionStorage.setItem("distance", this.distancefinel)
    if (this.prix < 3000) { this.prix = 3000; sessionStorage.setItem("prix", this.prix); } 
    else { sessionStorage.setItem("prix", this.prix); }  //3000
    
    //$('#message').html(Math.round(this.distancefinel));
     
    };
  });
 this.prix= sessionStorage.getItem("prix");
 this.distance=sessionStorage.getItem("distance")
  console.log(this.prix,this.distance);

}
 
  option(id,pnom,adresse,email,telephone){
      this.id_user = id;
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
    this.id_user = tata.id;
    this.pnom=tata.pnom;
    this.email=tata.email;
    this.telephone=tata.telephone;
    this.adresse=tata.adresse;
    console.log(this.id_user);

  });
this.option(this.id_user,this.pnom,this.adresse,this.email,this.telephone)
console.log(this.id_user);

   this.apiService.navette(data,this.id_user)
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
  this.id_user = tata.id;
  this.pnom=tata.pnom;
  this.email=tata.email;
  this.telephone=tata.telephone;
  this.adresse=tata.adresse;
  console.log(tata);
});
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
  this.id_user = tata.id;
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
