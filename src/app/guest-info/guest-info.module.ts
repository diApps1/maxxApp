import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestInfoPageRoutingModule } from './guest-info-routing.module';

import { GuestInfoPage } from './guest-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestInfoPageRoutingModule
  ],
  declarations: [GuestInfoPage]
})
export class GuestInfoPageModule {}
