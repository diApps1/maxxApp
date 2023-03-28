import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _headers: HttpHeaders;

  initial_url = "https://backendtestingsetup.tech/api/";

  constructor(private http: HttpClient,
) {
  this._headers = new HttpHeaders();
  this._headers = this._headers.append('Accept', 'application/json');
  this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
 }
 createAccount(body:any) {
  let api = this.initial_url + 'register';
  return this.http.post(api , body , {headers : this._headers});
}
 loginAccount(body:any) {
  let api = this.initial_url + 'login';
  return this.http.post(api , body , {headers : this._headers});
}

logout() {
  this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  let api = this.initial_url + 'logout';
  return this.http.post(api  , {} ,  {headers : this._headers});
}


getProfileByID(token : any) {
  this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  let api = this.initial_url + 'profile';
  return this.http.get(api , {headers : this._headers} );
}
updateProfile(body:any) {
  this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  let api = this.initial_url + 'profile-update';
  return this.http.post(api , body , {headers : this._headers} );
}


}
