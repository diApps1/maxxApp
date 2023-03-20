import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // signUpForm : any;
  otpSent : boolean = false;
  nextPage: boolean = false;

  firstName = '';
  lastName  = '';
  email  = '';
  password : any;
  c_password : any;
  phoneNumber : any;
  otp : any;
  timer  = 5;
  resend : boolean = false;
  resendTimer : boolean = false;
  isOtpVerified : boolean = false;
  constructor(private location : Location, private auth_service : AuthService,
     private toast : ToasterService,private router : Router) { 
    // this.signUpForm = new FormGroup({
    //   firstName : new  FormControl('' , Validators.required),
    //   lastName : new  FormControl('' , Validators.required),
    //   email : new  FormControl('' , Validators.required),
    //   password : new  FormControl('' , Validators.required),
    //   c_password : new  FormControl('' , Validators.required),
    //   phoneNumber : new  FormControl('' , Validators.required),
    //   otp : new  FormControl(''),



    // });
   }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  changeView() {
    console.log(this.firstName , this.lastName , this.email)
    if(this.firstName != '' && this.lastName != '' && this.email != '') {
      if(this.email.toString().match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ){
        this.nextPage ? this.nextPage = false : this.nextPage = true
      } else {
        this.toast.presentToast('email is badly formatted' , 'warning')
      }

    } else {
      this.toast.presentToast('missing requried fields' , 'warning')

    }
  }

  submitSignup() {
    console.log(this.password , this.c_password , 'check')
    if(this.password.toString().match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$') && 
    this.c_password.toString().match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')){
      let  body = {
        first_name : this.firstName,
        last_name : this.lastName,
        email : this.email,
        password : this.password,
        c_password : this.c_password,
        phone : this.phoneNumber
      }
      console.log(body)
      this.auth_service.createAccount(body).subscribe((res:any) => {
        console.log(res)
        if(res.success) {
          this.router.navigateByUrl('login');
          this.toast.presentToast(res.message , 'success');
          this.firstName = '';
          this.lastName  = '';
          this.email  = '';
          this.password = '';
          this.c_password = '';
          this.phoneNumber = '';
          this.otp = 'any';
        } else {
          this.toast.presentToast(res.message , 'warning');
        }
      },(err:any) => {
        this.toast.presentToast(err.message , 'danger');
      })
    } else {
      this.toast.presentToast('password must contain 1 special character 1 Capital letter and 1 digit' , 'warning')
 
    }

   
   
  }

  sendOtp() {
    this.otpSent = true;
    this.resendTimer = true;
    this.countTime();
  }
  stopCounter : boolean = false;
  verifyOtp(event:any) {
    console.log(event)
    if(event.target.value == '1234') {
      this.stopCounter = true;
      this.resendTimer = false;
      this.otpSent = false;
      this.isOtpVerified = true;
      this.toast.presentToast('otp verified succesfully' , 'success');
    }
  }

  countTime() {
    if(!this.stopCounter) {
      if(this.otpSent && this.timer > 0) {
        setTimeout(() => {
          console.log('idher')
          this.timer = this.timer - 1;
          console.log(this.timer)
        this.countTime();
        }, 1000);
      } else {
        this.resendTimer = false;
        this.resend = true;
      }
    }
    
  }

  sendAgain() {
    this.timer = this.timer + 10;
    this.countTime();
    this.resendTimer = true;
    this.resend = false;
  }
}
