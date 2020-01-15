import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detai-chauffeur',
  templateUrl: './detai-chauffeur.page.html',
  styleUrls: ['./detai-chauffeur.page.scss'],
})
export class DetaiChauffeurPage implements OnInit {
  d:{}
  id:number
 
  constructor(private apiService: ApiService,private router:ActivatedRoute,
    public actionsheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.id=this.router.snapshot.params['id'];
    console.log(this.id)
    this.apiService.detailchauffeur(this.id).subscribe(
      res=>{
        this.d = res
        console.log(this.d) 
      },
      error=>console.log(error)
    )
  }
  

}
