import { AcessoListComponent } from './acesso-list/acesso-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoFormComponent } from './acesso-form/acesso-form.component';

const routes: Routes = [
  { path: '', component: AcessoListComponent },
  { path: 'new', component: AcessoFormComponent },
  { path: 'editar/:id', component: AcessoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcessoRoutingModule { }
