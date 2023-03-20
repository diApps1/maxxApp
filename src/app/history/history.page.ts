import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private location : Location,private router:Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }

  back() {
    this.location.back();
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

}
