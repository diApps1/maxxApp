import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private location : Location , private toast : ToasterService) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  submitSignup() {
    this.toast.presentToast('account created succesfully')
  }

}
