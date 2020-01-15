import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //host="https://subitotaxi.net/manager/api/mobile/"
  host="http://localhost/subitoManager/"

date;id;table;id_user





  constructor(private http: HttpClient) { }
  //========================CHAUFFEURS++++++++++++++++++++++++//
  listeChauffeur()
  {
  const url=this.host+ 'listeChauffeur.php'
   return this.http.get<any>(url);
 }
 detailchauffeur(data):Observable<any> {
  console.log(data)
  const url=this.host +'detailchauffeur.php?id='
  return this.http.get<any>(url+data);

 }
  ajoutChauffeur(chauff,FileUpload): Observable<any> {
    const url=this.host+ 'register.php';
  const formData: FormData = new FormData();
  formData.append('pnom', chauff.pnom);
  formData.append('telephone', chauff.telephone);
  formData.append('telephone2', chauff.telephone2);
  formData.append('motdepasse', chauff.motdepasse);
  formData.append('adresse', chauff.adresse);
  formData.append('cin', chauff.cin);
  formData.append('permis', chauff.permis);
  formData.append('photo_id', FileUpload , FileUpload.name); 
  formData.append('anniversaire', chauff.anniversaire);
  console.log(formData)
  return this.http.post<any>(url, formData);
 }
 //+++++++++++++++++++++++++++++++++++++++++UTILISATEURS=======================================//
 ajoutUser(chauff): Observable<any> {
  const url=this.host+ 'user.php';
const formData: FormData = new FormData();
formData.append('pnom', chauff.pnom);
formData.append('telephone', chauff.telephone);
formData.append('email', chauff.email);
formData.append('password', chauff.password);
formData.append('adresse', chauff.adresse);
formData.append('password_r', chauff.password_r);
formData.append('anniversaire', chauff.anniversaire);
console.log(formData)
return this.http.post<any>(url, formData);
}
listUser()
{
const url=this.host+ 'listUser.php'
 return this.http.get<any>(url);
}
detailuser(data):Observable<any> {
  console.log(data)
  const url=this.host +'detailuser.php?id='
  return this.http.get<any>(url+data);
}

//==============================================ENTREPRISE++++++++++++++++++++++++++++++++++++++++//
 
listentreprise()
{
const url=this.host+ 'getEntreprise.php'
 return this.http.get<any>(url);
}
detailentreprise(data):Observable<any> {
  console.log(data)
  const url=this.host +'tailentreprise.php?id='
  return this.http.get<any>(url+data);
}
addentreprise(data){
const url=this.host +'addEntrprise.php'
  const formData: FormData = new FormData();
  formData.append('libelle_entreprise', data.libelle_entreprise);
  formData.append('adresse', data.adresse);
  formData.append('phone_entreprise', data.phone_entreprise);
  formData.append('pnom_owner', data.pnom_owner);
  formData.append('phone_owner', data.adresse);
  formData.append('tva', data.tva);
  formData.append('email1', data.email1);
  formData.append('email2', data.email2);
  formData.append('countryCode_en', data.countryCode_en);
  console.log(formData)
  return this.http.post<any>(url,formData);
 }

//++++++++++++++++++++++++++++++++++++++++++++++RESERVATIONS========================================//


encours() {
  const url=this.host +'listeperiode.php'
   return this.http.get<any>(url);
 }
 enattente() {
  const url=this.host +'enattente.php'
   return this.http.get<any>(url);
 }
 archive() {
  const url=this.host +'archives.php'
   return this.http.get<any>(url);
 }
 detail(id,table):Observable<any> {
  console.log(id,table)
  let data = 'id='+id+'&t='+table;
  const url=this.host +'getdetails.php?'
  return this.http.get<any>(url+data);
}
info(pnom):Observable<any> {
  console.log(pnom)
 const formData: FormData = new FormData();
 formData.append('pnom', pnom.pnom);
  const url=this.host +'info.php'
  return this.http.post<any>(url,formData);
  
}
 estimtarif(data){
  const url=this.host +'calculfare.php'
  const formData: FormData = new FormData();
  formData.append('vehicule', data.vehicule);
  formData.append('bagage', data.bagage);
  formData.append('nbre_personne', data.nbre_personne);
  console.log(formData)
  return this.http.post<any>(url,formData);
 }
 
 navette(data,id_user) {
 const formData: FormData = new FormData();
 formData.append('typetransfert', data.typetransfert);
 formData.append('vehicule', data.vehicule);
 formData.append('date', data.date);
 formData.append('timepicker', data.timepicker);
 formData.append('adresse', data.adresse);
 formData.append('bagage', data.bagage);
 formData.append('pnom', data.pnom);
 formData.append('email', data.email);
 formData.append('telephone', data.telephone);
 formData.append('countryCode_na', data.countryCode_na);
 formData.append('mode_paiement', data.mode_paiement);
 formData.append('numvol', data.numvol);
 formData.append('nbre_personne', data.nbre_personne);
 formData.append('commentaire', data.commentaire);

 console.log(id_user)
 const url=this.host +'reserver.php'

 console.log(formData,this.id_user)
 return this.http.post<any>(url,formData);

 }

 taxiu(data){
   
const url=this.host +'taxiu.php'
const formData: FormData = new FormData();
formData.append('date', data.date);
formData.append('timepicker', data.timepicker);
formData.append('depart', data.depart);
formData.append('arriver', data.arriver);
formData.append('pnom', data.pnom);
formData.append('telephone', data.telephone);
formData.append('countryCode_na', data.countryCode_na);
formData.append('vehicule', data.vehicule);

console.log(formData)
return this.http.post<any>(url,formData);
 }
 regions(data){
  const url=this.host +'region.php'
  const formData: FormData = new FormData();
  formData.append('date', data.date);
  formData.append('timepicker', data.timepicker);
  formData.append('depart', data.depart);
  formData.append('arriver', data.arriver);
  formData.append('pnom', data.pnom);
  formData.append('email', data.email);
  formData.append('vehicule', data.vehicule);
  formData.append('telephone', data.telephone);
  formData.append('countryCode_na', data.countryCode_na);
  console.log(formData)
  return this.http.post<any>(url,formData);
   }
   valider(id,date,table):Observable<any> {
    this.date=date
    this.id=id
    this.table=table
    console.log(id,date,table)
    let data = 'i='+id+'&d='+date+'&t='+table;
    const url=this.host +"validate.php?";
    return this.http.get<any>(url+data);

   }
   decliner(id,date,table):Observable<any> {
    this.date=date
    this.id=id
    this.table=table
    console.log(id,date,table)
    let data = 'i='+id+'&d='+date+'&t='+table;
    const url=this.host +"cancel.php?";
    return this.http.get<any>(url+data);

  }
  paiement(id,date,table):Observable<any> {
    console.log(id,date,table)
    let data = 'i='+id+'&d='+date+'&t='+table;
    const url=this.host +"paid.php?";
    return this.http.get<any>(url+data);

  }
  supprimer(id,date,table):Observable<any> {
    console.log(id,date,table)
    let data = 'i='+id+'&d='+date+'&t='+table;
    const url=this.host +"delete.php?";
    return this.http.get<any>(url+data);
  }
  validechauffeur(id,table,idr):Observable<any> {
    console.log(id,table,idr)
    let data = 'i='+id+'&t='+table+'&r='+idr;
    const url=this.host +"assigner.php?";
    return this.http.get<any>(url+data);
  }
}
