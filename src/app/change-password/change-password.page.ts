import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  codeSent : boolean = false;
  codeVerified : boolean = false;
  constructor(private location : Location,private toaster  :ToasterService,private router : Router) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  sendCode() {
    this.codeSent = true;
    this.toaster.presentToast('Code sent on your email succesfully' , 'success')
  }
  codeVerify(event : any)  {
    if(event.target.value == '1234') {
      this.codeSent = false;
      this.codeVerified = true;
      this.toaster.presentToast('Code verified succesfully' , 'success')
    } else {
      this.toaster.presentToast('you have entered an invalid code' , 'warning')
    }
  }

  changePassword() {
    this.toaster.presentToast('password changed succesfully' , 'success');
    this.router.navigateByUrl('login');
    localStorage.clear();
  }
}
