import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public authentificated: boolean;
  public authen: boolean;

  public token: string;
  jwt:string ;
  roles:Array<string>;
  pnom:string;
  host="https://subitotaxi.net/manager/api/mobile/"
  constructor(private http:HttpClient) {
  }

  
  login(data){
    const url=this.host+ 'authentification.php';
    const formData: FormData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    console.log(formData)
    return this.http.post<any>(url, formData);

  }
  aplitoken(jwt:any){
    localStorage.setItem("token",jwt);
    this.jwt=jwt;
   
    
    console.log(jwt)
  }
  

  parseJWT(){
    this.roles=this.roles;
    console.log(this.roles);
  }

  isAdmin(){
    this.aplitoken(this.jwt)
    if (this.jwt =='admin') {

    return ("admin");
    }
  }
  isUse(){
    this.aplitoken(this.jwt)
    if (this.jwt=='supervisor') {
    
    return ("supervisor");
    }
  }
  isAuthentificed(){
    return this.roles && (this.isAdmin()|| this.isUse() );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.jwt = undefined;
    this.roles = undefined;
  }
 /* login(username: string, password: string) {
    if (username == 'mayajolie' && password == 'mayajolie') {
      this.authentificated = true;

    }
    else {
      this.authentificated = false;
    }
    return this.authentificated;

  }

  private saveToken() {
    this.token = "azerty";
    localStorage.setItem("myToken",this.token);
  }

  public loadToken() {
    this.token = localStorage.getItem("mytoken");
    if (this.token=="azerty"){
      this.authentificated=true;
    }
    else {
      this.authentificated = false;

    }
    return this.authentificated;

  }*/
}
