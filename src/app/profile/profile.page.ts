import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private location : Location,private router : Router,private auth_service : AuthService,
    private toaster : ToasterService) { }

  ngOnInit() {
    if(localStorage.getItem('access_token')) {
      this.auth_service.getProfileByID(localStorage.getItem('access_token')).subscribe((res:any) => {
        console.log(res);
      })
    } else {
          this.toaster.presentToast('your session is expired,Login again');
      this.router.navigateByUrl('login')
    }
  }

  back() {
    this.location.back();
  }

  updateProfile() {
    // this.toaster.presentToast('You had booked adeel succesfully');
  }

}
