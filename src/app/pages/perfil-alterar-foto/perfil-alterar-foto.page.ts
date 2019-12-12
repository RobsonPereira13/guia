import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-alterar-foto',
  templateUrl: './perfil-alterar-foto.page.html',
  styleUrls: ['./perfil-alterar-foto.page.scss'],
})
export class PerfilAlterarFotoPage implements OnInit {

  public ativo: boolean = true;
  public uploadPercert : Observable<number>;
  public downloadUrl: Observable<string>;
  public user: User = {} ;
  private loading: any;
  profile = 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'
  
  userSubscription: Subscription
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera : Camera,
    private platform :Platform,
    private file : File,
    private asfStorage: AngularFireStorage 
  ) {
    this.loadUser();
   }

  ngOnInit() {
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

  async updateUser(){
    await this.presentLoading();
    await this.authService.updateUser(this.authService.getAuth().currentUser.uid,this.user)
    await this.loading.dismiss();
  }

  // async openGalery(){
  //   await this.presentLoading();
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     correctOrientation: true
  //   };
  
  //   try{
  //     const fileUrl: string = await this.camera.getPicture(options);
  
  //     let file: string;
  
  //     if(this.platform.is('ios')){
  //       file = fileUrl.split('/').pop();
  
  //     }else {
  //       file = fileUrl.substring(fileUrl.lastIndexOf('/') + 1,fileUrl.indexOf('?'));
  //     }
  
  //     const path: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
  
  //     const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
  //     const blob : Blob = new Blob([buffer], { type: 'image/jpeg'});
  
  //     this.uploadPicture(blob);
      
  //   }catch(error){
  //     console.error(error);
  
  //   }
  //   this.user.foto = this.downloadUrl;
  //   await this.loading.dismiss();
  //  }
  
  //  uploadPicture(blob: Blob){
  //    const ref = this.asfStorage.ref(this.user.nome);
  //    const task = ref.put(blob);
  
  //    this.uploadPercert = task.percentageChanges();
  
  //    task.snapshotChanges().pipe(
  //      finalize(() => this.downloadUrl = ref.getDownloadURL())
  
  //    ).subscribe();
  
  //    }

     async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
      return this.loading.present();
    }
  
    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({ message, duration: 2000 });
      toast.present();
    }
  

}
