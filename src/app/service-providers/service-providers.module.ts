import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProvidersPageRoutingModule } from './service-providers-routing.module';

import { ServiceProvidersPage } from './service-providers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProvidersPageRoutingModule
  ],
  declarations: [ServiceProvidersPage]
})
export class ServiceProvidersPageModule {}
