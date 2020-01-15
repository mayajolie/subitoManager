import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  d:{}
  id:number
  operlist
  op
  ret=[];
  env=[];
  afficherRecu;
  details:any;
  chauf;
  res;date;table;detail
ofItem=5;
noOfItem=1
noOfP=2  ; noOfB=3; noOfV=4 ;  noOfE=2

  constructor(private apiService: ApiService,private router:ActivatedRoute,
    public actionsheetCtrl: ActionSheetController
) { }

  ngOnInit() {
      this.id=this.router.snapshot.params['id'];
      this.table=this.router.snapshot.params['table'];

      console.log(this.id,this.table)
      this.apiService.detail(this.id,this.table).subscribe(
        res=>{
          this.d = res
          console.log(this.d)
        },
        error=>console.log(error)
      )

    }
    choix(){
      document.getElementById('tous').style.display="block";
    }
    assigner(){
      this.apiService.listeChauffeur()
      .subscribe(
        value=> { this.chauf=value;
        console.log(this.chauf)
      });

    }
    Valider(id,date,table){
      console.log(id,date,table);
      this.apiService.valider(id,date,table)
      .subscribe(
        value=> { this.res=value;
        console.log(this.res)
      }); 
    }
    decliner(id,date,table){
      this.id=id;
      this.date=date;
      this.table=table;
      console.log(id,date,table)
      this.apiService.decliner(id,date,table)
      .subscribe(
        value=> { this.res=value;
        console.log(this.res)
      }); 
    }
    
    paiement(id,date,table){
      console.log(id,date,table)
      this.apiService.paiement(id,date,table)
      .subscribe(
        value=> { this.res=value;
        console.log(this.res)
      }); 
    }
    Supprimer(id,date,table){
      console.log(id,date,table);
      this.apiService.supprimer(id,date,table)
      .subscribe(
        value=> { this.res=value;
        console.log(this.res)
      }); 
    }
    recu(){
      this.afficherRecu=true;
      setTimeout(()=>{
        window.print();
      },3000)
    } 
   Bagage(id){
     console.log(id);
   }
   option(id,table,idr){
    idr=this.router.snapshot.params['id'];
     console.log(id,table,idr)
     this.apiService.validechauffeur(id,table,idr)
     .subscribe(
       value=> { this.res=value;
        Swal.fire(value)

       console.log(this.res)
     }); 
   }

   
   }


