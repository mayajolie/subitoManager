import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  public image = {
    name : 'maya',
    email: 'jolie@gmailcom',
    tel: '772918604',
    adresse: 'parcelle',
    logo: '/assets/images/images.jpeg'
  }
  constructor() { }

  ngOnInit() {
  }

}
