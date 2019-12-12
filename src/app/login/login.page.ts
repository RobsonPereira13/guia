import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logoWhite = '../../assets/logo/logo-white.png'

  private loading: any;
  private user: User ={};
  
  constructor(
    public router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    private afs:AngularFirestore) { }

  ngOnInit() {
  }


  async logar(){
    await this.presentLoading();
   
    try {
      await this.authService.login(this.user);
      console.log("logado com sucesso")
    this.router.navigate(['home'])
    } catch (error) {
      console.error(error);
      let message: string;
      switch(error.code){
        case 'auth/argument-error':
          message = 'e-mail ou senha invalidos';
          break;
          case 'auth/wrong-password':
              message = 'Senha incorreta';
              break;
              case 'auth/user-not-found':
                message = 'e-mail não cadastrado';
                break;
      }
    
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }  


  cadastrar() {
    this.router.navigate(['guia-cadastrar'])
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }
}

