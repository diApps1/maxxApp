import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  allCatArray : any = [];
  search : any;
  imageUrl : any = 'https://backendtestingsetup.tech/public/';
  color : any = ['#F9D942' , '#F2B5BC' ]


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
    this.getAllCetagories();
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

  getAllCetagories() {
    this.api_Service.getAllCetagories().subscribe((res:any) => {
      if(res.success) {
        this.allCatArray = res.categories;
        console.log(this.allCatArray);
        let tempArray = [];
        this.allCatArray.forEach((elem:any , index:any) => {

          if(index%2 == 0) {
            elem['color'] = '#ffe400'
          } else {
            elem['color'] = '#ffe400'
          }
        })
      } else {
        this.toaster.presentToast(res.message , 'warning');
      }
  },(err:any) => {
    this.toaster.presentToast(err.error.message , 'danger');
  })
  }

  // getAllProducts() {
  //   this.api_Service.getAllProducts().subscribe((res:any) => {
  //       if(!res.success) {
  //         this.allProductsArray = res;
  //         console.log(this.allProductsArray)
  //       } else {
  //         this.toaster.presentToast(res.message , 'warning');
  //       }
  //   },(err:any) => {
  //     this.toaster.presentToast(err.error.message , 'danger')
  //   })
  // }

  searchProduct(event:any) {
    // this.api_Service.getProductByName(event.target.value).subscribe((res:any) => {
    //   console.log(res);
    //   this.allProductsArray = [];
    //   this.allProductsArray = res.products;
    // },(err:any) => {
    //   this.getAllCetagories();
    // })

  }

  async navigate() {
      if (this.isUserLoggedIn) {
        this.router.navigateByUrl('profile');
      } else {
        this.router.navigateByUrl('login');
      }
    
  }

  goToNext(cat:any) {
    console.log(cat)
    if(cat.subcategories.length != 0) {
      console.log(cat.subcategories)
      const options = {queryParams: {data: JSON.stringify(cat.subcategories) , subCetagory : true}};
      this.router.navigate(['sub-cetagory'] , options);
  } else {
    this.api_Service.getProductBycatId(cat.id).subscribe((res:any) => {
              if(res.status){
                const options = {queryParams: {data: JSON.stringify(res.products) , subCetagory : false}};
                this.router.navigate(['sub-cetagory'] , options);
                this.loader.stopLoading();
              } else {
                this.toaster.presentToast(res.message , 'warning');
                this.loader.stopLoading();
              }
          },(err:any) => {
            this.toaster.presentToast(err.error.message , 'danger');
            this.loader.stopLoading();
          })
  }
    // this.loader.presentLoading().then(() => {
    //   if(cat.sub_categories.length != 0) {
    //     const options = {queryParams: {data: JSON.stringify(cat.sub_categories)}};
    //     this.router.navigate(['sub-cetagory'] , options);
    //     this.loader.stopLoading();
    //   } else {
    //     this.api_Service.getProductBycatId(cat.id).subscribe((res:any) => {
    //         if(res.status){
    //           const options = {queryParams: {data: JSON.stringify(res.products)}};
    //           this.router.navigate(['sub-cetagory'] , options);
    //           this.loader.stopLoading();
    //         } else {
    //           this.toaster.presentToast(res.message , 'warning');
    //           this.loader.stopLoading();
    //         }
    //     },(err:any) => {
    //       this.toaster.presentToast(err.error.message , 'danger');
    //       this.loader.stopLoading();
    //     })
    //   }
    // })
   
    
  }
  openServiceProviders(data?:any) {
    this.router.navigateByUrl('service-providers-detail');
  }

  goToSettings() {
    this.router.navigateByUrl('notifications')
  }

  logOut() {
    if (this.isUserLoggedIn) {
    } else {
      this.router.navigateByUrl('login');
    }
  }

}
