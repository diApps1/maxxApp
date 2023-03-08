import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loading: LoadingController) { }

  async presentLoading(message? : any) {
    const loadingC = await this.loading.create({
        spinner: 'crescent',
        message: message ? message :  'Loading...',
        translucent: true,
        cssClass: 'custom-loading'

    });
    return await loadingC.present();
}

async stopLoading() {
    await this.loading.dismiss();
}
}
