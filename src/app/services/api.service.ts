import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _headers: HttpHeaders;
  
  initial_url = "https://backendtestingsetup.tech/api/";

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders();
    this._headers = this._headers.append('Accept', 'application/json');
    this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  
  }

  getAllProducts() {
    let api = this.initial_url + 'products';
    return this.http.get(api );
  }
  getProductByName(body:any) {
    this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    let api = this.initial_url + 'products/search/' + body;
    return this.http.get(api , {headers : this._headers} );
  }

  getAllCetagories() {
    let api = this.initial_url + 'categories/all';
    return this.http.get(api );
  }
  getProductBycatId(id:any) {
    let api = this.initial_url + 'category-products/' + id;
    return this.http.get(api);

  }

  createBooking(body:any) {
    this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    let api = this.initial_url + 'booking/save';
    return this.http.post(api , body , {headers : this._headers} );
  }
  createPayment(body:any) {
    this._headers = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    let api = this.initial_url + 'transaction/save';
    return this.http.post(api , body , {headers : this._headers} );
  }

}
