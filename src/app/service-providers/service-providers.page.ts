import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.page.html',
  styleUrls: ['./service-providers.page.scss'],
})
export class ServiceProvidersPage implements OnInit {
  isUserLoggedIn: boolean = false;

  imageUrl : any = 'https://backendtestingsetup.tech/public/';

  constructor(private router: Router ,
    private modalCtrl: ModalController,
     private location : Location) { }

  ngOnInit() {
  }
  navigate() {
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl('profile')
    } else {
      this.router.navigateByUrl('login')
    }
  }
  openDetail() {
    this.router.navigateByUrl('service-providers-detail')
  }
  back() {
    this.location.back();
  }
//  async openFilterModal() {
//     const modal = await this.modalCtrl.create({
//     });
//     modal.present();
//     const { data, role } = await modal.onWillDismiss();
    
//     if (role === 'confirm') {
      
//     }
//   }
}
