import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventProviderService } from '../services/event-provider.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router : Router,private event_provider : EventProviderService) {}

  goToLandingPage() {
    this.router.navigateByUrl('landing-page')
  }
  goToLogin() {
    this.router.navigateByUrl('login')
  }
  goToSignUp() {
    this.router.navigateByUrl('signup')
  }
}
