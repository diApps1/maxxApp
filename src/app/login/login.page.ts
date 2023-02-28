import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : any

  constructor(private location : Location , private toast : ToasterService) {
    this.loginForm = new FormGroup({
      userName : new  FormControl('' , Validators.required),
      password : new FormControl('' , [Validators.required,Validators.pattern
      ('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });
   }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  submitLogin() {
    console.log(this.loginForm.value)
    this.toast.presentToast('login succesfully');
  }

  

 }
