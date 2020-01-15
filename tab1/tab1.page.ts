import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public contact = {
    name : 'maya',
    email: 'jolie@gmailcom',
    tel: '772918604',
    adresse: 'parcelle',
    logo: '/assets/wari.jpg'
  }
  constructor() {}

}
