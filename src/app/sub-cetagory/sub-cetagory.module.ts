import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCetagoryPageRoutingModule } from './sub-cetagory-routing.module';

import { SubCetagoryPage } from './sub-cetagory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCetagoryPageRoutingModule
  ],
  declarations: [SubCetagoryPage]
})
export class SubCetagoryPageModule {}
