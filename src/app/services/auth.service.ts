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
 }
 createAccount(body:any) {
  let api = this.initial_url + 'register';
  return this.http.post(api , body , {headers : this._headers});
}
 loginAccount(body:any) {
  let api = this.initial_url + 'login';
  return this.http.post(api , body , {headers : this._headers});
}
}
