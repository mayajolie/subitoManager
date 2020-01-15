import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  users=[]

  constructor(private router:Router,private apiService: ApiService) { }

  ngOnInit() {

  }
  listUser() {
    this.apiService.listUser()
    .subscribe(
      value=> { this.users=value;
      console.log(this.users)
    });
  }

  inscrit(form) {
    console.log(form)
    this.apiService.ajoutUser(form)
     .subscribe(
       res =>  {
        Swal.fire(res)
        this.router.navigate(["/menu/inscription/"])
       console.log(res) 
     },
       err =>{
         console.log(err)
         if (err.error. MESSAG) {
           Swal.fire(err.error. MESSAG)
         }
        
       } 
     )
  }
  listUserById(id:number){
    this.router.navigate(['/menu/detail-user',id])
    }
}
