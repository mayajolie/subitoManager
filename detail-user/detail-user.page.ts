import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

  d:{}
  id:number
  operlist
  op
  ret=[];
  env=[];
  afficherRecu;
  details:any;
  chauf;
  constructor(private apiService: ApiService,private router:ActivatedRoute,
    public actionsheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.id=this.router.snapshot.params['id'];
    console.log(this.id)
    this.apiService.detailuser(this.id).subscribe(
      res=>{
        this.d = res
        console.log(this.d) 
      },
      error=>console.log(error)
    )
  }

}
