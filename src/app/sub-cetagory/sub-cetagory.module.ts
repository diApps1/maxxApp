import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCetagoryPageRoutingModule } from './sub-cetagory-routing.module';

import { SubCetagoryPage } from './sub-cetagory.page';
import { SharedModule } from '../shared/shared.module';
// import Swiper from 'swiper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SubCetagoryPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SubCetagoryPage]
})
export class SubCetagoryPageModule {}
