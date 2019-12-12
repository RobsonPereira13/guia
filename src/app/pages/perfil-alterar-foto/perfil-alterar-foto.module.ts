import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilAlterarFotoPage } from './perfil-alterar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAlterarFotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilAlterarFotoPage]
})
export class PerfilAlterarFotoPageModule {}
