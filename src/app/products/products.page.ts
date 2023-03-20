import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  isUserLoggedIn: boolean = false;
  search : any = '';
  productsArray : any = [];
  cetagoryName : any;



  constructor(private route : ActivatedRoute , private location : Location,private loader : LoaderService,
     private router : Router,private api_Service : ApiService) { 
      this.route.queryParamMap.subscribe((params:any) => {
        this.productsArray = JSON.parse(params.params.data);
        console.log(this.productsArray);
        this.cetagoryName = this.productsArray[0].category.name ? this.productsArray[0].category.name : '';
        this.productsArray.forEach((elem:any , index:any) => {
          if(index%2 == 0) {
            elem['color'] = '#F9D942'
          } else {
            elem['color'] = '#F2B5BC'
          }
        })
        // this.productsArray = JSON.parse(params.params.data);
      })
   }

  ngOnInit() {

  }

  back() {
    this.location.back();
  }

  ionViewDidEnter() {
    this.getAllSubCetagory();
    this.search = '';
    if(localStorage.getItem('access_token')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  getAllSubCetagory() {
   
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  };

  goToSettings() {
    this.router.navigateByUrl('notifications')
  }

  logOut() {
    if (this.isUserLoggedIn) {
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('login');
    } 
}

goToBooking(data:any) {
  this.loader.presentLoading().then(() => {
    const options = {queryParams: {data: JSON.stringify(data)}};
    this.router.navigate(['service-providers-detail'] , options);
    this.loader.stopLoading();
    })
}

}
