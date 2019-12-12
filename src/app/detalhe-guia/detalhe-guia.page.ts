import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-guia',
  templateUrl: './detalhe-guia.page.html',
  styleUrls: ['./detalhe-guia.page.scss'],
})
export class DetalheGuiaPage implements OnInit {
  profile = 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'

  constructor() { }

  ngOnInit() {
  }

}
