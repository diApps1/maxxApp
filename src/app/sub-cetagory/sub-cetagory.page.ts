import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';
import { register } from 'swiper/element/bundle';
import { EventProviderService } from '../services/event-provider.service';
import {
  trigger,
  state,
  style,
  animate,
  sequence,
  keyframes,
  transition,
} from '@angular/animations'
register();

@Component({
  selector: 'app-sub-cetagory',
  templateUrl: './sub-cetagory.page.html',
  styleUrls: ['./sub-cetagory.page.scss'],
})
export class SubCetagoryPage implements OnInit {
  isUserLoggedIn: boolean = false;
  subCatArray : any = [];
  search : any = '';
  mainCetagoryTitle : any;
  cartArray : any = [];
  isSubCetagory = '';

  constructor(private route : ActivatedRoute ,private event_provider : EventProviderService,
     private toaster : ToasterService, private location : Location,
    private loader : LoaderService,
     private router : Router,private api_Service : ApiService) { 


    this.route.queryParamMap.subscribe((params:any) => {
      console.log(params.params.subCetagory)
      if(params.params.subCetagory == 'true') {
        this.isSubCetagory = params.params.subCetagory;
        this.subCatArray = JSON.parse(params.params.data);
      this.subCatArray.forEach((elem:any , index:any) => {
        elem.products.forEach((element:any , i:any) => {
        element['quantity'] = 0;
      })
      })
      } else {
        this.isSubCetagory = params.params.subCetagory;
        this.subCatArray = JSON.parse(params.params.data);
              this.mainCetagoryTitle = this.subCatArray[0].category.name;
        this.subCatArray.forEach((elem:any , index:any) => {
          elem['quantity'] = 0;
        })
      }
      
      console.log(this.subCatArray)
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
    if(localStorage.getItem('cart')) {
      this.cartArray = JSON.parse(localStorage.getItem('cart') as string);
      this.cartArray.forEach((elem:any , i:any) => {
        const index = this.subCatArray.findIndex((x:any , i:any) => x.id == elem.id);
        this.subCatArray[index] = elem;
      })

    }
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
  addtoCart(product:any) {
      product['quantity'] = product.quantity + 1;
      console.log(this.subCatArray)
      if(this.cartArray.length == 0) {
        this.cartArray.push(product);
      }else {
        const index = this.cartArray.findIndex((x:any) => x.id == product.id);
        if(index >= 0) {
          this.cartArray.splice(index , product);
        } else {
          this.cartArray.push(product)
        }
      }
      this.event_provider.addCart(this.cartArray);
   
    // if(this.cartArray.length == 0) {
    //   this.cartArray.push(product);
    //   this.cartArray[0]['quantity'] = 1;
    // } else {
    //   const index = this.cartArray.findIndex((x:any) => x.id == product.id);
    //   console.log(index)
    //   if (index >= 0) {
    //     this.cartArray[index]['quantity'] = this.cartArray[index].quantity + 1;
    //   } else {
    //     this.cartArray.push(product);
    //     const newIndex = this.cartArray.lastIndexOf(product)
    //     this.cartArray[newIndex]['quantity'] = 1;
    //   }
    // }
  }
  removeFromCart(product:any) {
    if(product.quantity > 0) {
      product['quantity'] = product.quantity - 1;
      const index = this.cartArray.findIndex((x:any) => x.id == product.id);
      if(index >= 0) {
        if(product.quantity > 0) {
          this.cartArray.splice(index , product);
          } else {
            this.cartArray.splice(index , 1)
          }
      }
      this.event_provider.addCart(this.cartArray);
    }
   
   
    // if(this.cartArray.length == 0) {
    //   return;
    // } else {
    //   const index = this.cartArray.findIndex((x:any) => x.id == product.id);
    //   if(index >= 0) {
    //     if(this.cartArray[index]['quantity'] != 1 ) {
    //       this.cartArray[index]['quantity'] = this.cartArray[index].quantity - 1 ;
    //     } else {
    //       this.cartArray.splice(index , 1);
    //     }
    //   } 
    // }
  }




  async navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('login');
    }
  
}

}
