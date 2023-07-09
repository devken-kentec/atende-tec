import { CalendarioFormAlteracaoComponent } from './calendario-form-alteracao/calendario-form-alteracao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioFormComponent } from './calendario-form/calendario-form.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';

const routes: Routes = [
  { path: '', component: CalendarioListComponent },
  { path: 'new', component: CalendarioFormComponent },
  { path: 'editar/:id', component: CalendarioFormComponent },
  { path: 'alteracao', component: CalendarioFormAlteracaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }
