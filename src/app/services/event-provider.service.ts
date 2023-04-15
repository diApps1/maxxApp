import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {
  isUserLoggedin = new Subject<any>();
  hidefooter = new Subject<any>();
  addcart = new Subject<any>();

  constructor() { }


  isuserloggedin(data : any) {
    this.isUserLoggedin.next(data);
}
hideFooter(data:boolean) {
  this.hidefooter.next(data);
}
addCart(data?:any) {
  console.log(data)
  this.addcart.next(data);
  localStorage.setItem('cart' , JSON.stringify(data))
}
}
