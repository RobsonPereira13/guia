import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Subscription, Observable } from 'rxjs';
import { ChatService, Chat } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  private guiaId: string = null;
  private userId: string = null;
  public user: User = {};
  private loading: any;
  private userSubscription: Subscription;
  private guiaSubscription: Subscription;
  private chatSubscription: Subscription;

  chats = new Array<Chat>();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private chatService: ChatService
  ) { 

    // this.guiaId = this.activatedRoute.snapshot.params['id'];
    this.userId = this.authService.getAuth().currentUser.uid;

    // if (this.guiaId) this.loadGuia();
    if (this.userId) this.loadUser();

    this.chatSubscription = this.chatService.getGuiaChats(this.userId).subscribe(data => {
      this.chats = data;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // if (this.guiaSubscription) this.guiaSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  // chatHandler() {
  //   this.chatService.setChat(this.userId, this.user.nome, this.user.foto, this.guia.foto, this.guiaId, this.guia.nome)
  // }

  // loadGuia() {
  //   this.guiaSubscription = this.guiaService.getGuia(this.guiaId).subscribe(data => {
  //     this.guia = data;
  //   });
  // }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

  deletarChat(id){
    this.chatService.deleteChatId(id);
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
