import { PerfilAtendimentoFormComponent } from './perfil-atendimento-form/perfil-atendimento-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PerfilAtendimentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilAtendimentoRoutingModule { }
