import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firstName : any;
  lastName : any;
  email : any;
  gender : any;
  profile_pic : any;
  phone : any;

  constructor(private location : Location,private loader : LoaderService,
    private router : Router,private auth_service : AuthService,
    private toaster : ToasterService) { }

  ngOnInit() {
   
  }

  ionViewDidEnter() {
    if(localStorage.getItem('access_token')) {
      this.loader.presentLoading().then(() => {
        this.auth_service.getProfileByID(localStorage.getItem('access_token')).subscribe((res:any) => {
          console.log(res);
          if(res.success) {
            this.firstName = res.data.first_name;
            this.lastName = res.data.last_name;
            this.email = res.data.email;
            this.phone = res.data.phone;
            this.loader.stopLoading();
          } else {
            this.toaster.presentToast(res.message , 'warning');
            this.loader.stopLoading();
          }
        },(err:any) => {
          this.toaster.presentToast(err.error.message , 'danger');
          this.loader.stopLoading();
        })
      })
     
    } else {
      this.toaster.presentToast('Sorry , you are using guest mode now, Session Expired' , 'warning');
      this.router.navigateByUrl('landing-page');
    }
  }




  back() {
    this.location.back();
  }

  updateProfile() {
    // this.toaster.presentToast('You had booked adeel succesfully');
  }

}
