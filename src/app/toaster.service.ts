import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController: ToastController) { }


  
  async presentToast(text?:any , colors? : any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      cssClass: 'custom-toast',
      color : colors
      // buttons: [
      //   {
      //     text: 'Dismiss',
      //     role: 'cancel'
      //   }
      // ],
    });

    await toast.present();
  }
}
