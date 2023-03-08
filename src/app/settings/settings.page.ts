import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isUserLoggedIn : boolean = false;
  constructor(private location : Location,private loader : LoaderService,private auth_service : AuthService,
    private toaster : ToasterService,private router : Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    
  }

  back() {
    this.location.back();
  }

  goToProfile() {
    if(localStorage.getItem('access_token')) {
      this.router.navigateByUrl('profile');
    } else {
      this.toaster.presentToast('You are using guest mode' , 'warning');
      this.router.navigateByUrl('landing-page');
    }
  }

  goToPendingOrders() {
    this.toaster.presentToast('Sorry , No Pending Orders Yet' , 'warning')
  }

  goToCompletedOrders() {
    this.toaster.presentToast('Sorry , No Completed Orders Yet' , 'warning')
  }

  logOut () {
    this.loader.presentLoading().then(()  => {
      this.auth_service.logout().subscribe((res:any) => {
        if(res.success) {
          localStorage.clear();
          this.isUserLoggedIn = false;
          this.toaster.presentToast('Log out succesfully' , 'success');
          this.router.navigateByUrl('landing-page');
          this.loader.stopLoading();
        } else {
          this.toaster.presentToast('Sorry You cant Logout' , 'warning');
          this.loader.stopLoading();
        }
      } , (err:any) => {
        this.toaster.presentToast('You are Not Logged In' , 'danger');
        this.loader.stopLoading();
      })
    })
  }

}
