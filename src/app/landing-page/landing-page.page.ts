import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  isUserLoggedIn: boolean = false;
  constructor(private router: Router,private location:Location) { }

  ngOnInit() {
  }

  navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  openServiceProviders() {
    this.router.navigateByUrl('service-providers');
  }

  goToSettings() {
    this.router.navigateByUrl('settings')
  }

}
