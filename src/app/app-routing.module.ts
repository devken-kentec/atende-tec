import { AuthGuard } from './modulos/guard/auth-guard';
import {  } from './modulos/unidade/unidade.module';
import {  } from './modulos/orgao/orgao.module';
import {  } from './modulos/guiche/guiche.module';
import {  } from './modulos/calendario/calendario.module';
import {  } from './modulos/servico/servico.module';
import {  } from './modulos/detalhamento-servico/detalhamento-servico.module';
import {  } from './modulos/grade/grade.module';
import {  } from './modulos/agendamento/agendamento.module';
import {  } from './modulos/contribuinte/contribuinte.module';
import {  } from './modulos/acesso/acesso.module';
import {  } from './modulos/servidor/servidor.module';
import {  } from './modulos/perfil-atendimento/perfil-atendimento.module';
import {  } from './modulos/ativacao/ativacao.module';
import {  } from './modulos/atendimento/atendimento.module';
import {  } from './modulos/painel/painel.module';
import {  } from './modulos/login/login.module';
import {  } from './modulos/relatorios/relatorios.module';
import {  } from './modulos/upload/upload.module';
import {  } from './modulos/mural/mural.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'unidade', loadChildren: './modulos/unidade/unidade.module#UnidadeModule', canActivate:[AuthGuard]},
  { path: 'orgao', loadChildren: './modulos/orgao/orgao.module#OrgaoModule', canActivate:[AuthGuard]},
  { path: 'guiche', loadChildren: './modulos/guiche/guiche.module#GuicheModule', canActivate:[AuthGuard]},
  { path: 'calendario', loadChildren: './modulos/calendario/calendario.module#CalendarioModule', canActivate:[AuthGuard]},
  { path: 'servico', loadChildren: './modulos/servico/servico.module#ServicoModule', canActivate:[AuthGuard]},
  { path: 'detalhamentoservico', loadChildren: './modulos/detalhamento-servico/detalhamento-servico.module#DetalhamentoServicoModule', canActivate:[AuthGuard]},
  { path: 'grade', loadChildren: './modulos/grade/grade.module#GradeModule', canActivate:[AuthGuard]},
  { path: 'agendamento', loadChildren: './modulos/agendamento/agendamento.module#AgendamentoModule', canActivate:[AuthGuard]},
  { path: 'contribuinte', loadChildren: './modulos/contribuinte/contribuinte.module#ContribuinteModule', canActivate:[AuthGuard]},
  { path: 'acesso', loadChildren: './modulos/acesso/acesso.module#AcessoModule', canActivate:[AuthGuard]},
  { path: 'servidor', loadChildren:  './modulos/servidor/servidor.module#ServidorModule', canActivate:[AuthGuard]},
  { path: 'perfilatendimento', loadChildren: './modulos/perfil-atendimento/perfil-atendimento.module#PerfilAtendimentoModule', canActivate:[AuthGuard]},
  { path: 'ativacao', loadChildren: './modulos/ativacao/ativacao.module#AtivacaoModule', canActivate:[AuthGuard]},
  { path: 'atendimento', loadChildren: './modulos/atendimento/atendimento.module#AtendimentoModule', canActivate:[AuthGuard]},
  { path: 'painel', loadChildren: './modulos/painel/painel.module#PainelModule', canActivate:[AuthGuard]},
  { path: 'relatorios', loadChildren: './modulos/relatorios/relatorios.module#RelatoriosModule',  canActivate:[AuthGuard]},
  { path: 'upload', loadChildren: './modulos/upload/upload.module#UploadModule', canActivate:[AuthGuard]},
  { path: 'mural', loadChildren: './modulos/mural/mural.module#MuralModule', canActivate:[AuthGuard]},
  { path: 'home', loadChildren: './modulos/home/home.module#HomeModule' , canActivate:[AuthGuard]},
  { path: 'login', loadChildren: './modulos/login/login.module#LoginModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
