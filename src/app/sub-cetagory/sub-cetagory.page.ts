import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
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
  constructor(private route : ActivatedRoute , private toaster : ToasterService,
     private router : Router,private api_Service : ApiService) { 
    this.route.queryParamMap.subscribe((params:any) => {
      this.subCatArray = JSON.parse(params.params.data);
    })
   }

  ngOnInit() {

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
    this.api_Service.getProductBycatId(id).subscribe((res:any) => {
      if(res.status){
        const options = {queryParams: {data: JSON.stringify(res.products)}};
        this.router.navigate(['products'] , options);
      } else {
        this.toaster.presentToast(res.message , 'warning');
      }
    },(err:any) => {
      this.toaster.presentToast(err.error.message , 'danger');
    })
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

  async navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('login');
    }
  
}

}
