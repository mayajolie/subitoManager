import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menus=[
    {title:"Nos Reservations ", url:"menu/liste",icon:'filing'},
    {title:"Reserver", url:"menu/reservations",icon:'swap'},
    {title:"Entreprise", url:"menu/entrepise",icon:'paper'},
    {title:"Inscription", url:"menu/inscription",icon:'person-add'},
    {title:"Chauffeur", url:"menu/chauffeurs",icon:'car'},
    {title:"Deconnexion", url:"/login",icon:'log-out'},



]

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onMenu(m) {
    this.router.navigateByUrl(m.url);
      
  }
}
