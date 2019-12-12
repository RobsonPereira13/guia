import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, IonItem } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-guia-cadastrar',
  templateUrl: './guia-cadastrar.page.html',
  styleUrls: ['./guia-cadastrar.page.scss'],
})
export class GuiaCadastrarPage implements OnInit {

  private loading: any;
  private user: User = {};
 
  public form : NgForm;
  
  public guiaCadastrarForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    private afs: AngularFirestore
   
  ) {
    this.guiaCadastrarForm = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30) 
      ])],
      'sobrenome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30) 
      ])],
      'email':  [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') 
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12) 
      ])],
      'cadastur': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(18) 
        
      ])],
      'linguas': [null, Validators.compose([
        Validators.required,
        
      ])],
      'telefone': [null, Validators.compose([
        Validators.required, 
        Validators.maxLength(12) 
        
        //Validators.pattern('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$')
      ])]
    })
   }
  ngOnInit() {
    // this.cadastrarUsuario();
  }

  ngOnDestroy() {
    this.limpar();
  }

  async register(){
    
    await this.presentLoading();
    try
    {
      //Cadastrando o guia e autenticação
  const newUser = await this.authService.register(this.user);
  // console.log("Usuario cadastrado com sucesso")
  //Adicionando os dados a base de dados
  //Setar campo ativo como defult false
  this.user.ativo = false;
  this.user.plantao = false;
  this.user.avaliacao = 0;
  //Setar campo foto como uma imagem defult
  this.user.foto = "";
  await this.afs.collection('Guias').doc(newUser.user.uid).set(this.user);
  // console.log("Dados adicionais salvos com sucesso")
  
    }catch (error) {
      console.error(error);
      let message: string;
      switch(error.code){
        case 'auth/email-already-in-use':
          message = 'e-mail já cadastrado';
          break;
          case 'auth/invalid-email':
              message = 'informe um e-mail  valido';
              break;
              case 'auth/argument-error':
                message = 'informe um e-mail';
                break;
              
      }
      this.presentToast(message);
  }finally {
    this.loading.dismiss();
  }
}

 
// adicionando um spiner
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  limpar() {
    this.guiaCadastrarForm.reset();
  }

}
