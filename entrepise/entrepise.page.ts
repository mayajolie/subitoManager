import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrepise',
  templateUrl: './entrepise.page.html',
  styleUrls: ['./entrepise.page.scss'],
})
export class EntrepisePage implements OnInit {
  Transaction=[];
  data:any

  constructor(private apiService: ApiService,private router:Router) { }

  ngOnInit() {
 
  }
  entreprise(){
    this.apiService.listentreprise()
    .subscribe(
      value=> { this.Transaction=value;
      console.log(this.Transaction)
    });
    
  }
  
  addentreprise(data){
    this.apiService.addentreprise(data)
    .subscribe(
      value=> { this.data=value;
      console.log(this.data)
    });

  }
  listEntrepriseById(id:number){
    this.router.navigate(['/menu/detail-entreprise',id])
    }

}
