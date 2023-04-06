import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController: ToastController) { }


  
  async presentToast(text?:any , colors? : any) {
    var css_class = '';
    var icon = '';
    if(colors == 'success') {
      css_class = 'success-toast';
      icon = 'checkmark-circle';
    } else if (colors == 'warning') {
      css_class = 'warning-toast';
      icon = 'alert-circle';
    } else if (colors == 'danger') {
      css_class = 'danger-toast';
      icon = 'skull';
    }
    console.log(colors , icon)
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      cssClass: css_class,
      color : colors,
      position: 'top',
      icon : icon
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
