import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private location : Location , private toast : ToasterService) { 
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
    this.toast.presentToast('account created succesfully')
  }

  sendOtp() {
    this.otpSent = true;
  }
}
