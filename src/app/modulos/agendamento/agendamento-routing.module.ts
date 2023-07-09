import { AgendamentoUpFormComponent } from './agendamento-up-form/agendamento-up-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { AgendamentoExclusaoComponent } from './agendamento-exclusao/agendamento-exclusao.component';

const routes: Routes = [
  { path: '', component: AgendamentoListComponent },
  { path: 'new/:id', component: AgendamentoFormComponent },
  { path: 'editar/:id', component: AgendamentoFormComponent },
  { path: 'edit/:id', component: AgendamentoUpFormComponent },
  { path: 'excluiragendamento', component: AgendamentoExclusaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule { }
