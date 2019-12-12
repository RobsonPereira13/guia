import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { SettingsComponent } from '../components/settings/settings.component';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController
 
  ) {}
  async mostrarOpcoes(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      event: ev,
      animated: true,
      mode: 'ios',
      showBackdrop: true
      
    });

      return await popover.present();

  }
  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
