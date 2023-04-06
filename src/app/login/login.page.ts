import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventProviderService } from '../services/event-provider.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : any;

  loginSpinner : boolean = false;
  error : boolean = false;

  constructor(private location : Location, private fb : FormBuilder, private loader_service : LoaderService,
     private router : Router,private event_provider : EventProviderService,
     private auth_service : AuthService,
     private toast : ToasterService) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.required]],
      });
   }

  ngOnInit() {

  }
  

  ionViewDidEnter() {
    if(localStorage.getItem('access_token')) {
      this.loader_service.presentLoading('you are already login').then(() => {
        this.router.navigateByUrl('profile');
        this.loader_service.stopLoading();
      })
    }
  }

  back() {
    this.location.back();
  }

  goToChangePassword() {
    this.router.navigateByUrl('change-password');
  }

  submitLogin() {
    this.loginSpinner = true;
      this.auth_service.loginAccount(this.loginForm.value).subscribe((res:any) => {
        console.log(res)
        if(res.success) { 
          this.loginSpinner = false;
          this.event_provider.isuserloggedin(true);
          this.toast.presentToast(res.message , 'success');
          localStorage.setItem('access_token' , res.access_token);
          this.router.navigateByUrl('landing-page');
        } else {
          this.loginSpinner = false;
          this.makeErrorTrue();
          this.toast.presentToast('Email or Password is incorrect' , 'warning');
        }
      },(err:any) => {
        this.loginSpinner = false;
        this.makeErrorTrue();
        this.toast.presentToast('Unable to find user with these credentials at a moment , Try again Later' , 'danger');
    })
    
  }

  goToSignup() {
    this.router.navigateByUrl('signup')
  }

  makeErrorTrue(from?:any) {
  
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 1000);
   
  
  }

 }
