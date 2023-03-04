import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventProviderService } from '../services/event-provider.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  isUserLoggedIn: boolean = false;
  constructor(private router: Router,private location:Location,private event_provider : EventProviderService) { 
    this.event_provider.isUserLoggedin.subscribe((res) => {
      console.log(res)
      this.isUserLoggedIn = res;
    })
  }

  ngOnInit() {
    if(localStorage.getItem('access_token')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    console.log('user' , this.isUserLoggedIn)

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
