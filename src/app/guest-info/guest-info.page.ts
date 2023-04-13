import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.page.html',
  styleUrls: ['./guest-info.page.scss'],
})
export class GuestInfoPage implements OnInit {

  loginSpinner : boolean = false;
  error : boolean = false;
  firstName : any = '';
  lastName :any = '';
  email:any = '';
  phoneNumber:any = '';


  constructor(private router:Router) { }

  ngOnInit() {
  }

  back() {
  }

  continueProcess() {
    if(this.firstName != '' && this.lastName != '' && this.email != '' && this.phoneNumber != '') {
      let guestData = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        phone : '+971' + this.phoneNumber
      }
      localStorage.setItem('guestData' , JSON.stringify(guestData));
      this.router.navigateByUrl('service-providers-detail');
    } else {

    }
  }

}
