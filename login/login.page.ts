import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user;
  constructor(private authen:AuthentificationService,private router:Router) { }

  ngOnInit() {
  }
  isAdmi(){
    return this.authen.isAdmin();
}
    isUser(){
        return this.authen.isUse();
    }
   
  onLogin(user){
      console.log(user)
    this.authen.login(user)
              .subscribe(resp=> {
                let jwt: any = resp.role;
                console.log(resp.email);
                this.authen.aplitoken(jwt);
                      this.router.navigateByUrl("/menu/liste")
                  
              });
}
}
