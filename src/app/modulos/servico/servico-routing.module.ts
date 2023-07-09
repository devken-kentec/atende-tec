import { ServicoListComponent } from './servico-list/servico-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoFormComponent } from './servico-form/servico-form.component';

const routes: Routes = [
  { path: '', component: ServicoListComponent },
  { path: 'new', component: ServicoFormComponent },
  { path: 'editar/:id', component: ServicoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
