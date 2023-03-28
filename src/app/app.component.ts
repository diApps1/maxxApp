import { Component, OnInit } from '@angular/core';
import { EventProviderService } from './services/event-provider.service';
import {
  trigger,
  state,
  style,
  animate,
  sequence,
  keyframes,
  transition,
  useAnimation,
} from '@angular/animations';

import { Router } from '@angular/router';
import { KeyboardEventDetail } from '@ionic/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('bounce', [
      // state('inital', style({transform: 'translateY(0)'})),
      state('active', style({transform: 'translateY(0)'})),
      state('inactive', style({transform: 'translateY(0)'})),
      // transition('initial => active', [
      //   animate('500ms cubic-bezier(0,0,0,1)'),
      // ]),
      // transition('active => initial', [
      //   animate('500ms cubic-bezier(1,0,1,1)'),
      // ]),
      transition('* => active', [
        sequence([
          style({ transform: 'translateY(0)'}),
          animate("400ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-200px)' })),
          animate("300ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-50px)' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("100ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-10px)' })),
          animate("80ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
        ]),
      ]),
      transition('* => inactive', [
        sequence([
          style({ transform: 'translateY(0)'}),
          animate("400ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-200px)' })),
          animate("300ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-50px)' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("100ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-10px)' })),
          animate("80ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
        ]),
      ])
    ]),
  ]
 
})

export class AppComponent implements OnInit {
  state = '';
cartArray : any =[];
  isHideFooter : boolean = false;
  isKeyBoardOpen : boolean = false;
  cartEmpty : boolean = true;
  constructor(private event_provider : EventProviderService,private router : Router ) {

    window.addEventListener('keyboardWillShow', () => {
      this.isKeyBoardOpen = true; 
      this.state = '';
    });    
    window.addEventListener('keyboardWillHide', () => {
      this.isKeyBoardOpen = false;
      this.state = '';
    });

    this.event_provider.hidefooter.subscribe((res:boolean) => {
      this.isHideFooter = res;
      console.log(this.isHideFooter)
    });
    this.event_provider.addcart.subscribe((res:any) => {
      this.cartArray = res;
      if(this.state == 'inactive') {
        this.state = '';
      }
    this.state = this.state ? 'inactive' : 'active';
    console.log(this.state)
      if(localStorage.getItem('cart')?.length != 0) {
        this.cartEmpty = false;
      } else {
        this.cartEmpty = true;
      }
      // this.state = '';
    })

  }

 

  ngOnInit(): void {
    if(localStorage.getItem('cart')?.length != 0) {
      this.cartEmpty = false;
    } else {
      this.cartEmpty = true;
    }
  }

  setState() {
    this.router.navigateByUrl('service-providers-detail')
  }




}
