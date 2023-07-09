import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';

const routes: Routes = [
  { path: '', component: UnidadeListComponent },
  { path: 'new', component: UnidadeFormComponent },
  { path: 'editar/:id', component: UnidadeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
