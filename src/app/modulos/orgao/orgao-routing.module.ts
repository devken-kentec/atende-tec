import { OrgaoListComponent } from './orgao-list/orgao-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgaoFormComponent } from './orgao-form/orgao-form.component';

const routes: Routes = [
  { path: '', component: OrgaoListComponent },
  { path: 'new', component: OrgaoFormComponent },
  { path: 'editar/:id', component: OrgaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgaoRoutingModule { }
