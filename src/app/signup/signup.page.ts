import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

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
  city:any;
  street:any;
  state:any;
  timer  = 5;
  resend : boolean = false;
  resendTimer : boolean = false;
  isOtpVerified : boolean = false;
  page : any =[
    {active : false},
    {active : false},
    {active : false},
  ]
  constructor(private location : Location, private auth_service : AuthService,
     private toast : ToasterService,private router : Router , private loader_service : LoaderService) { 

   }

  ngOnInit() {
    this.page[0].active = true;
  }

  back() {
    this.location.back();
  }

  changeView(from?:any , nature?:any) {

    if(this.firstName != '' && this.lastName != '' && this.email != '') {
      if(this.email.toString().match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ){
        if(from == '0') {
          this.page[0].active = false;
          this.page[1].active = true;
        } else if (from == '1' && nature == 'back') {
          this.page[1].active = false;
          this.page[0].active = true;
        } 
        else if(from == '1') {
          this.page[1].active = false;
          this.page[2].active = true;
        } else if (from == '2') {
          this.page[2].active = false;
          this.page[1].active= true;
        }
      } else {
        this.toast.presentToast('email is badly formatted' , 'warning')
      }

    } else {
      this.toast.presentToast('missing requried fields' , 'warning')

    }
  }

  submitSignup() {
    let address = this.street + ' ' + this.city + ' ' + this.state + ' ' +  'united arab emirates';
    console.log(address)
    if(this.password == this.c_password) {
      let  body = {
            first_name : this.firstName,
            last_name : this.lastName,
            email : this.email,
            password : this.password,
            c_password : this.c_password,
            phone : this.phoneNumber,
            address : address
          }
          this.loader_service.presentLoading().then(() => {
            this.auth_service.createAccount(body).subscribe((res:any) => {
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
                this.loader_service.stopLoading();
              } else {
                this.toast.presentToast(res.message , 'warning');
                this.loader_service.stopLoading();
              }
            },(err:any) => {
              this.toast.presentToast(err.message , 'danger');
              this.loader_service.stopLoading();
            })
          })
      
    } else {
      this.toast.presentToast('Password does not match' , 'warning');
      this.loader_service.stopLoading();
    }
    // if(this.password.toString().match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$.') && 
    // this.c_password.toString().match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$.')){
    //   let  body = {
    //     first_name : this.firstName,
    //     last_name : this.lastName,
    //     email : this.email,
    //     password : this.password,
    //     c_password : this.c_password,
    //     phone : this.phoneNumber,
    //     address : address
    //   }
    //   console.log(body)
    //   this.auth_service.createAccount(body).subscribe((res:any) => {
    //     console.log(res)
    //     if(res.success) {
    //       this.router.navigateByUrl('login');
    //       this.toast.presentToast(res.message , 'success');
    //       this.firstName = '';
    //       this.lastName  = '';
    //       this.email  = '';
    //       this.password = '';
    //       this.c_password = '';
    //       this.phoneNumber = '';
    //       this.otp = 'any';
    //     } else {
    //       this.toast.presentToast(res.message , 'warning');
    //     }
    //   },(err:any) => {
    //     this.toast.presentToast(err.message , 'danger');
    //   })
    // } else {
    //   this.toast.presentToast('password must contain 1 special character 1 Capital letter and 1 digit' , 'warning')
 
    // }

   
   
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
