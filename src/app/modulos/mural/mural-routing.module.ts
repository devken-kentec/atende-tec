import { MuralListComponent } from './mural-list/mural-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuralFormComponent } from './mural-form/mural-form.component';

const routes: Routes = [
  { path: "", component: MuralListComponent },
  { path: "new", component: MuralFormComponent },
  { path: "editar/:id", component: MuralFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuralRoutingModule { }
