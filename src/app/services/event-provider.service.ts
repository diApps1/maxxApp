import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {
  isUserLoggedin = new Subject<any>();

  constructor() { }


  isuserloggedin(data : any) {
    this.isUserLoggedin.next(data);
}
}
