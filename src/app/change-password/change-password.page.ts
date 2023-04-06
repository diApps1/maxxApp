import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  codeSent : boolean = false;
  codeVerified : boolean = false;

  otpError : boolean = false;
  verifyError : boolean = false;
  error: boolean = false;
  emailError: boolean = false;
  otpSpinner : boolean = false;
  verifySpinner : boolean = false;
  changePasswordSpinner : boolean = false;
  emailSpinner : boolean = false;
email : any ='';
password : any = '';
c_password : any = ''

  userData : any;
  constructor(private location : Location,private auth_service : AuthService,
    private toaster  :ToasterService,private router : Router,private route:ActivatedRoute) {
      this.route.queryParamMap.subscribe((res:any) => {
        console.log(res)
        this.userData = JSON.parse(res.params.data);
        console.log(this.userData)
      })
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }
  ionViewDidLeave() {
    this.userData = '';
    this.email = '';
    this.password = '';
    this.c_password = '';
    this.otpSpinner  = false;
    this.verifySpinner  = false;
    this.changePasswordSpinner  = false;
    this.emailSpinner  = false;
    this.codeSent = false;
    this.codeVerified = false;
  }

  back() {
    this.location.back();
  }
  sendEmailCode() {
    this.toaster.presentToast('coming soon' , 'warning')      
  }
  sendCode() {
    if(this.userData) {
      this.otpSpinner = true;
      let body = {
        phone : '+923017649437'
      }
      this.auth_service.sendOtp(body).subscribe((res:any) => {
          if(res.success) {
            this.otpSpinner = false;
            this.codeSent = true;
            this.toaster.presentToast('Code sent on your email succesfully' , 'success')      
          } else {
            this.toaster.presentToast('something went wrong' , 'warning')      
            this.otpSpinner = false;
            this.makeErrorTrue('otp');
          }
      },(err:any) => {
        this.otpSpinner = false;
        this.toaster.presentToast('unable to send otp at a moment , try again later' , 'danger')      
        this.makeErrorTrue('otp');
      })
    } else {
      this.otpSpinner = true;
      let body = {
        email : this.email
      }
      this.auth_service.sendEmailOtp(body).subscribe((res:any) => {
          if(res.success) {
            this.otpSpinner = false;
            this.codeSent = true;
            this.toaster.presentToast('Code sent on your email succesfully' , 'success')      
          } else {
            this.toaster.presentToast('sorry user not found with this email' , 'warning')      
            this.otpSpinner = false;
            this.makeErrorTrue('otp');
          }
      },(err:any) => {
        this.otpSpinner = false;
        this.toaster.presentToast('unable to send otp at a moment , try again later' , 'danger')      
        this.makeErrorTrue('otp');
      })
    }
 
  }
  codeVerify(event : any)  {

    if(this.userData) {
      if(event.target.value.length == '6') {
        this.verifySpinner = true;
          let body = {
            phone : '+923017649437',
            code : event.target.value
          }  
        this.auth_service.verifyOtp(body).subscribe((res:any) => {
            if(res.success) {
              this.verifySpinner = false;
              this.codeSent = false;
              this.codeVerified = true;
              this.toaster.presentToast('Code verified succesfully' , 'success')  ;    
            } else {
              this.makeErrorTrue('verify');
              this.verifySpinner = false;
              this.toaster.presentToast('invalid code' , 'warning');
            }
          } , (err:any) => {
            this.makeErrorTrue('verify');
            this.verifySpinner = false;
            this.toaster.presentToast('something went wrong' , 'danger');
          })
      }
    } else {
      if(event.target.value.length == '6') {
        this.verifySpinner = true;
          let body = {
            email : this.email,
            code : event.target.value
          }  
        this.auth_service.verifyMailOtp(body).subscribe((res:any) => {
            if(res) {
              this.verifySpinner = false;
              this.codeSent = false;
              this.codeVerified = true;
              this.toaster.presentToast('Code verified succesfully' , 'success')  ;    
            } else {
              this.makeErrorTrue('verify');
              this.verifySpinner = false;
              this.toaster.presentToast('invalid code' , 'warning');
            }
          } , (err:any) => {
            this.makeErrorTrue('verify');
            this.verifySpinner = false;
            this.toaster.presentToast('something went wrong' , 'danger');
          })
      }
    }

    
   
  }

  changePassword() {
    this.changePasswordSpinner = true;
    if(this.password == this.c_password) {
      let body = {
        email : this.email,
        password : this.password
      }
      this.auth_service.updatePassword(body).subscribe((res:any) => {
        if(res.success) {
          this.changePasswordSpinner = true;
          this.toaster.presentToast('password changed succesfully' , 'success');
          this.router.navigateByUrl('login');
          localStorage.clear();
          }
      })
    } else {
      this.changePasswordSpinner = false;
      this.makeErrorTrue();
    }
   
 
  }

  makeErrorTrue(from?:any) {

    if(from == 'otp') {
      this.otpError = true;
      setTimeout(() => {
        this.otpError = false;
      }, 1000);
    } else if (from == 'verify') {
      this.verifyError = true;
      setTimeout(() => {
        this.verifyError = false;
      }, 1000);

    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 1000);
    }
  
   
 

}
}
