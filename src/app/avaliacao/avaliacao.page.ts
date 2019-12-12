import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, NavController, ToastController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {

  public uploadPercert: Observable<number>;
  public downloadUrl: Observable<string>;
  public user: User = {};
  private loading: any;

  userSubscription: Subscription;




  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private asfStorage: AngularFireStorage

  ) {
    //pegando o usuario logado

    this.loadUser();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.limpar();
  }

  ativoUpdate() {
    this.user.plantao = false
    this.updateUser();
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }
  //Metodo para atualizar um objeto no banco
  async updateUser() {
    await this.presentLoading();
    await this.authService.updateUser(this.authService.getAuth().currentUser.uid, this.user)
    await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  change() {
    this.updateUser();
  }

  limpar() {
    this.user = null;
  }


  //  async openGalery(){
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
  //  }

  //  uploadPicture(blob: Blob){
  //    const ref = this.asfStorage.ref(this.user.nome);
  //    const task = ref.put(blob);

  //    this.uploadPercert = task.percentageChanges();

  //    task.snapshotChanges().pipe(
  //      finalize(() => this.downloadUrl = ref.getDownloadURL())

  //    ).subscribe();

  //    this.user.foto = this.downloadUrl;
  //    }

}
