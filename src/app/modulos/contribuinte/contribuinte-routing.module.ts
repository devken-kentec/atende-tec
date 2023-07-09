import { ContribuinteListComponent } from './contribuinte-list/contribuinte-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContribuinteFormComponent } from './contribuinte-form/contribuinte-form.component';

const routes: Routes = [
  { path: '', component: ContribuinteListComponent },
  { path: 'new', component: ContribuinteFormComponent },
  { path: 'editar/:id', component: ContribuinteFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContribuinteRoutingModule { }
