import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventProviderService } from '../services/event-provider.service';
import { ToasterService } from '../toaster.service';
import {
  Platform,
  PopoverController,
  ActionSheetController,
  ModalController,
} from "@ionic/angular";
import { LogoutComponent } from '../logout/logout.component';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  isUserLoggedIn: boolean = false;
  allProductsArray : any = [];
  search : any;
  imageUrl : any = 'https://backendtestingsetup.tech/public/';


  constructor(private router: Router,private location:Location,private loader: LoaderService,
    private api_Service : ApiService,
    private auth_service : AuthService,
    public popoverController: PopoverController,
    private toaster : ToasterService,
    private event_provider : EventProviderService) { 
    this.event_provider.isUserLoggedin.subscribe((res) => {
      console.log(res)
      this.isUserLoggedIn = res;
    })
  }

  ngOnInit() {
   
  }

  ionViewDidEnter() {
    this.getAllProducts();
    this.search = '';
    if(localStorage.getItem('access_token')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  };

  getAllProducts() {
    this.api_Service.getAllProducts().subscribe((res:any) => {
        if(!res.success) {
          this.allProductsArray = res;
          console.log(this.allProductsArray)
        } else {
          this.toaster.presentToast(res.message , 'warning');
        }
    },(err:any) => {
      this.toaster.presentToast(err.error.message , 'danger')
    })
  }

  searchProduct(event:any) {
    this.api_Service.getProductByName(event.target.value).subscribe((res:any) => {
      console.log(res);
      this.allProductsArray = [];
      this.allProductsArray = res.products;
    },(err:any) => {
      this.getAllProducts();
    })

  }

  async navigate() {
      if (this.isUserLoggedIn) {
        this.router.navigateByUrl('profile');
      } else {
        this.router.navigateByUrl('login');
      }
    
  }

  openServiceProviders(data?:any) {
    this.router.navigateByUrl('service-providers-detail');
  }

  goToSettings() {
    this.router.navigateByUrl('settings')
  }

  logOut() {
    if (this.isUserLoggedIn) {
    } else {
      this.router.navigateByUrl('login');
    }
  }

}
