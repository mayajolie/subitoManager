import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map ,catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit {
  encours=[];
  enatente:any=[];
  archives=[];
  details:{};
  msg='Aucune Reservation pour le moment';
  type_transfert:any
  table;
  page=0;
  maxpage=3;
  category:any
  ms:any='Aucune reservation EN ATTENTE pour le moment'
  mes:any='Aucune reservation EN COURS pour le moment'



  constructor(private apiService: ApiService,private router:Router,public http: HttpClient) { }

  ngOnInit() {
  
  }
  
  
cours(){
  this.apiService.encours()
  .subscribe(
    value=> { this.encours=value;
    console.log(this.encours);
 
      this.mes=' '

    
  });
}
  attente(){
    this.apiService.enattente()
    .subscribe(
      value=> { this.enatente=value;
      console.log(this.enatente);
      if (this.enatente=='null') {
        this.ms;
      }
      if (value !='null') {
        this.ms=' '

      }
  
      
    });
  }
  archive(){
    this.apiService.archive()
    .subscribe(
      value=> { this.archives=value;
      console.log(value)
      if (value="null") {
        this.mes;
  
      }
    });
  }
  listOperationById(id:number,table){
console.log(id,table)
  this.router.navigate(['/menu/details',id,table])
  }
  
  
}
