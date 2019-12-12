import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-guias',
  templateUrl: './lista-guias.page.html',
  styleUrls: ['./lista-guias.page.scss'],
})
export class ListaGuiasPage implements OnInit {

  profile = 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'

  constructor() { }

  ngOnInit() {
  }

}
