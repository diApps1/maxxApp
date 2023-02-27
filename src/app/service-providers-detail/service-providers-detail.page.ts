import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-service-providers-detail',
  templateUrl: './service-providers-detail.page.html',
  styleUrls: ['./service-providers-detail.page.scss'],
})
export class ServiceProvidersDetailPage implements OnInit {

  constructor(private location : Location,private toastController: ToastController , private toaster : ToasterService) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  bookMe() {
    this.toaster.presentToast('You had booked adeel succesfully');
  }

}
