import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  private user: User ={};
  private loading: any;
  constructor(
    public router: Router,
    public toastController: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
  }

 
  async forgotpassword(email:string){
    
    await this.presentLoading();
  try {
    this.authService.forgotPasswordUser(this.user.email);
    
    this.router.navigate(['login'])
  
  } catch (error) {
    let message: string;
    switch(error.code){
     
          case 'auth/argument-error':
            message = 'informe o e-mail cadastrado';
          
            break;
            case 'auth/user-not-found':
            message = 'informe o e-mail cadastrado';
          
            break;
            
  }
      this.presentToast(message);
  } finally {
    this.loading.dismiss();
  }
  
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Verifique sua caixa de entrada' });
    
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 10000 });
    toast.present();
  }

}
