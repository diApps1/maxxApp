import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProvidersDetailPageRoutingModule } from './service-providers-detail-routing.module';

import { ServiceProvidersDetailPage } from './service-providers-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProvidersDetailPageRoutingModule
  ],
  declarations: [ServiceProvidersDetailPage]
})
export class ServiceProvidersDetailPageModule {}
