import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),canActivate:[AuthGuard]
  },
 
 
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate:[LoggedGuard] },
  { path: 'guia-cadastrar', loadChildren: './guia-cadastrar/guia-cadastrar.module#GuiaCadastrarPageModule',canActivate:[LoggedGuard] },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'editar-perfil', loadChildren: './editar-perfil/editar-perfil.module#EditarPerfilPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'perfil-alterar-foto', loadChildren: './pages/perfil-alterar-foto/perfil-alterar-foto.module#PerfilAlterarFotoPageModule',canActivate:[AuthGuard] },
  { path: 'home-menu', loadChildren: './home-menu/home-menu.module#HomeMenuPageModule' },
  { path: 'lista-guias', loadChildren: './lista-guias/lista-guias.module#ListaGuiasPageModule' },
  { path: 'detalhe-guia', loadChildren: './detalhe-guia/detalhe-guia.module#DetalheGuiaPageModule' },
  { path: 'avaliacao', loadChildren: './avaliacao/avaliacao.module#AvaliacaoPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule',canActivate:[AuthGuard]  },
  { path: 'mensagens', loadChildren: './mensagens/mensagens.module#MensagensPageModule',canActivate:[AuthGuard]  },
  { path: 'mensagens/:id', loadChildren: './mensagens/mensagens.module#MensagensPageModule',canActivate:[AuthGuard]  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
