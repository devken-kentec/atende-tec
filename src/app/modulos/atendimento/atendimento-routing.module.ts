import { AtendendoAtendimentoFormComponent } from './atendendo-atendimento-form/atendendo-atendimento-form.component';
import { ListaAtendimentoListComponent } from './lista-atendimento-list/lista-atendimento-list.component';
import { InicialAtendimentoFormComponent } from './inicial-atendimento-form/inicial-atendimento-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: InicialAtendimentoFormComponent },
  { path: 'listaAtendimento/:nome/:status', component: ListaAtendimentoListComponent },
  { path: 'atende/:id', component: AtendendoAtendimentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
