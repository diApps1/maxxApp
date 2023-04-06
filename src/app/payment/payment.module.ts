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
    NgxStripeModule.forRoot('pk_test_51MjxM2CPFpp8yabJE3D5LwYGIoq1TkeK7qHNIyAhyLGIUunzqiqJ6zP1ixGYv7KodBpTo6yicSWYN7pzudHB7Kyc00H7XHrEWk'),
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
