import { ServidorListComponent } from './servidor-list/servidor-list.component';
import { ServidorFormComponent } from './servidor-form/servidor-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ServidorListComponent },
  { path: 'new', component: ServidorFormComponent },
  { path: 'editar/:id', component: ServidorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServidorRoutingModule { }
