import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  isUserLoggedIn: boolean = false;
  search : any = '';
  productsArray : any = [];



  constructor(private route : ActivatedRoute , private location : Location, private router : Router,private api_Service : ApiService) { 
      this.route.queryParamMap.subscribe((params:any) => {
        let tempArray = [];
        tempArray = JSON.parse(params.params.data);
        tempArray.forEach((elem:any , index:any) => {
          if(index > 3) {
            this.productsArray.push(elem);
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
    this.router.navigateByUrl('settings')
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
  const options = {queryParams: {data: JSON.stringify(data)}};

  this.router.navigate(['service-providers-detail'] , options)
}

}
