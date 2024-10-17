import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
private toastCtrl: ToastController = inject(ToastController);

  constructor() { }

  async mostrarToast(message: string,color: string): Promise<void> {
    const toast = await this.toastCtrl.create({

      message,duration:1500,color,
      position:"bottom"
    });
    await toast.present();
  }

}
