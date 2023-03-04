import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventProviderService } from '../services/event-provider.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : any

  constructor(private location : Location,
     private router : Router,private event_provider : EventProviderService,
     private auth_service : AuthService,
     private toast : ToasterService) {
    this.loginForm = new FormGroup({
      email : new  FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required,)
    });
   }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  submitLogin() {
    console.log(this.loginForm.value);
    this.auth_service.loginAccount(this.loginForm.value).subscribe((res:any) => {
      console.log(res)
      if(res.success) { 
        this.event_provider.isuserloggedin(true);
        this.toast.presentToast(res.message);
        localStorage.setItem('access_token' , res.access_token);
        this.router.navigateByUrl('landing-page')
      } else {
        this.toast.presentToast(res.message);
      }
    },(err:any) => {
      console.log(err)
      this.toast.presentToast(err.error.message);
    })
  }

  

 }
