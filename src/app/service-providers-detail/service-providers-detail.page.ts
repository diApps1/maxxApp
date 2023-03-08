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

  weekNameArray : any = [
    {dayName : 'MON' , active : true},
    {dayName : 'TUE' , active : false},
    {dayName : 'WED' , active : false},
    {dayName : 'THU' , active : false},
    {dayName : 'FRI' , active : false},
    {dayName : 'SAT' , active : false},
    {dayName : 'SUN' , active : false},
];
  constructor(private location : Location,private toastController: ToastController , private toaster : ToasterService) { }

  ngOnInit() {}

  makeTrue(index:any) {
    this.weekNameArray.forEach((element : any) => {
      element.active = false;
    });
    this.weekNameArray[index].active = true;
  }

  back() {
    this.location.back();
  }

  bookMe() {
    this.toaster.presentToast('coming soon' , 'warning');
  }

  uploadOptions() {
    this.toaster.presentToast('coming soon' , 'warning');
  }

}
