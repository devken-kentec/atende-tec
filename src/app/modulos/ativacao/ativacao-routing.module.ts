import { AtivacaoFormComponent } from './ativacao-form/ativacao-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtivacaoListComponent } from './ativacao-list/ativacao-list.component';

const routes: Routes = [
  { path: '', component: AtivacaoFormComponent },
  { path: 'listarfila', component: AtivacaoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtivacaoRoutingModule { }
