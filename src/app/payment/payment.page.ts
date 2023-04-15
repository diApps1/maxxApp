import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../toaster.service';
import { Platform } from '@ionic/angular';
import { EventProviderService } from '../services/event-provider.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})

export class PaymentPage implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  booking_id : any ;
  amount : any ;
  stripe_token : any;
  payment_method : any ;
paymentSpinner : boolean = false;
error : boolean = false;
cardName : any;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        // fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        padding : '50px',
        
        '::placeholder': {
          color: '#31325F'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };


  paymentMethod : any;
  constructor(private location : Location,private event_provider : EventProviderService,
    private stripeService: StripeService,private platform : Platform,
    private toast : ToasterService,private router : Router,private route : ActivatedRoute,
    private api_Service : ApiService) {
        this.route.queryParamMap.subscribe((res:any) => {
          let data = JSON.parse(res.params.data)
          console.log(data.booking_id)
          this.booking_id = data.booking_id;
          this.amount = data.amount;
        })
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cardName = '';
    this.stripe_token = '';

    if(this.platform.is('ios')) {
      this.paymentMethod = 'c_card'
    } else {
      this.paymentMethod = 'apple_pay'
    }

  }

  back() {
    this.location.back();
  }
  enablePaymentMethod (event:any) {
    console.log(event.target.value);
    this.paymentMethod = event.target.value;
  }

  createToken(): void {
    this.paymentSpinner = true;
    const name = this.cardName;
    console.log(this.stripe_token)
    if(!this.stripe_token) {
      this.stripeService.createToken(this.card.element, { name }).subscribe((result) => {
        if (result.token) {
          // Use the token
          this.stripe_token = result.token.id;
          if(this.stripe_token) {
            let body = {
              stripe_token : this.stripe_token,
              booking_id : this.booking_id,
              amount : this.amount,
              is_guest : localStorage.getItem('access_token') ? 'false' : 'true',
              payment_method : this.paymentMethod == 'c_card' ? 'credit card' : 'debit card'
            }
            console.log(body);
              this.api_Service.createPayment(body).subscribe((res:any) => {
                  if(res.success) {
                    this.paymentSpinner = false;
                    this.event_provider.addCart([]);
                    this.toast.presentToast('you have succesfully booked a service' , 'success');
                    this.paymentMethod = '';
                    localStorage.setItem('cart' , '');
                    localStorage.removeItem('cart');          
                    localStorage.removeItem('guestData');          
                    this.router.navigateByUrl('landing-page');
                  } else {
                    this.paymentSpinner = false;
                    this.makeErrorTrue();
                    this.toast.presentToast('sorry your payment method is not valid' , 'warning')
                  }
              },(err:any) => {
                this.paymentSpinner = false;
                this.makeErrorTrue();
                this.toast.presentToast('something went wrong with your card Please Try Again' , 'danger')

              })
          }
        } else if (result.error) {
          // Error creating the token
          this.paymentSpinner = false;
          this.makeErrorTrue();
          this.toast.presentToast(result.error.message , 'danger')
        }
      });
    } else {
      let body = {
        stripe_token : this.stripe_token,
        booking_id : this.booking_id,
        amount : this.amount,
        is_guest : localStorage.getItem('access_token') ? 'false' : 'true',
        payment_method : this.paymentMethod == 'c_card' ? 'credit card' : 'debit card'
      }
      this.api_Service.createPayment(body).subscribe((res:any) => {
        if(res.success) {
          this.paymentSpinner = false;
          this.toast.presentToast('You have Succesfully Booked a Service' , 'success');
          this.paymentMethod = '';
          this.stripe_token = '';
          localStorage.setItem('cart' , '');
          localStorage.removeItem('cart');
          localStorage.removeItem('guestData');
          this.router.navigateByUrl('landing-page');
        } else {
          this.paymentSpinner = false;
          this.makeErrorTrue();
          this.toast.presentToast('sorry your payment method is not valid' , 'warning')
        }
    },(err:any) => {
      this.paymentSpinner = false;
      this.makeErrorTrue();
      this.toast.presentToast('something went wrong with your card Please Try Again' , 'danger')

    })
    }
    
  }

  makeErrorTrue(from?:any) {
  
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 1000);
 

}

}
