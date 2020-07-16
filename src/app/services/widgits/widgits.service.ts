import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class WidgitsService {

  constructor(private toastController: ToastController
    
    ) { }

  showLogInfo = (message) => {
    console.info('--INFO--'+ JSON.stringify(message))
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getEncryptPassword =() => {

  }
}
