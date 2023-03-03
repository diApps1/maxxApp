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
        this.toast.presentToast('email is badly formatted')

      }

    } else {
      this.toast.presentToast('missing requried fields')

    }
  }

  submitSignup() {
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
        this.toast.presentToast(res.message);
        this.firstName = '';
        this.lastName  = '';
        this.email  = '';
        this.password = '';
        this.c_password = '';
        this.phoneNumber = '';
        this.otp = 'any';
      } else {
        this.toast.presentToast(res.message);
      }
    },(err:any) => {
      this.toast.presentToast(err.message);
    })
   
  }

  sendOtp() {
    this.otpSent = true;
  }
}
