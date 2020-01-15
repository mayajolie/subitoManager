import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chauffeurs',
  templateUrl: './chauffeurs.page.html',
  styleUrls: ['./chauffeurs.page.scss'],
})
export class ChauffeursPage implements OnInit {
chauf:{};
Transaction=[];

fileToUpload: File = null;
imageUrl: string = "url('../../assets/logo.png";

  constructor(private router:Router,private apiService: ApiService) { }

  ngOnInit() { 
  
  }
  liste(){
    this.apiService.listeChauffeur()
    .subscribe(
      value=> { this.chauf=value;
      console.log(this.chauf)
    });
  }
  onFileUpload(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
 }
chauffeur(form) {
  console.log(form)
  this.apiService.ajoutChauffeur(form,this.fileToUpload)
   .subscribe(
     res =>  {this.router.navigateByUrl("/menu/chauffeurs")
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
listChauffeureById(id:number){
  this.router.navigate(['/menu/detai-chauffeur',id])
  }
}
