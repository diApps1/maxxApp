import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-sub-cetagory',
  templateUrl: './sub-cetagory.page.html',
  styleUrls: ['./sub-cetagory.page.scss'],
})
export class SubCetagoryPage implements OnInit {
  isUserLoggedIn: boolean = false;
  subCatArray : any = [];
  search : any = '';
  color : any = ['#F9D942' , '#F2B5BC' ]

  constructor(private route : ActivatedRoute , private toaster : ToasterService, private location : Location,
    private loader : LoaderService,
     private router : Router,private api_Service : ApiService) { 
    this.route.queryParamMap.subscribe((params:any) => {
      this.subCatArray = JSON.parse(params.params.data);
      this.subCatArray.forEach((elem:any , index:any) => {
        if(index%2 == 0) {
          elem['color'] = '#F9D942'
        } else {
          elem['color'] = '#F2B5BC'
        }
      })
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
    this.api_Service
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  };

  goToProduct(id:any) {
    this.loader.presentLoading().then(() => {
      this.api_Service.getProductBycatId(id).subscribe((res:any) => {
        if(res.status){
          const options = {queryParams: {data: JSON.stringify(res.products)}};
          this.router.navigate(['products'] , options);
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

  async navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('login');
    }
  
}

}
