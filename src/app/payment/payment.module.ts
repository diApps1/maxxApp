import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    NgxStripeModule.forRoot('pk_test_51Ml8VrJ9QAFDxHDSx88mNmJ8AfQQO0bglT5xckcosnbD2onO2rRyXeum6iKMB53Cgig9yssHQe7rlp2pjROal2Fm00BdkJihiM'),
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
