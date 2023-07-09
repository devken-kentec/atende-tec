import { GuicheListComponent } from './guiche-list/guiche-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuicheFormComponent } from './guiche-form/guiche-form.component';

const routes: Routes = [
  { path: '', component: GuicheListComponent },
  { path: 'new', component: GuicheFormComponent },
  { path: 'editar/:id', component: GuicheFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuicheRoutingModule { }
