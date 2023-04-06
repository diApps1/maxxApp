import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      ReactiveFormsModule,FormsModule],
  providers: [ Keyboard ,  { provide: RouteReuseStrategy, 
     useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
