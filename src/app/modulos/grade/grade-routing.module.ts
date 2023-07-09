import { GradeMultiFormComponent } from './grade-multi-form/grade-multi-form.component';
import { GradeLiberacaoFormComponent } from './grade-liberacao-form/grade-liberacao-form.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoFormComponent } from '../agendamento/agendamento-form/agendamento-form.component';

const routes: Routes = [
  { path: '', component: GradeListComponent},
  { path: 'new', component: GradeFormComponent },
  { path: 'editar/:id', component: GradeFormComponent },
  { path: 'agendamento/new', component: AgendamentoFormComponent },
  { path: 'liberargrade', component: GradeLiberacaoFormComponent },
  { path: 'grade/multi', component: GradeMultiFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
