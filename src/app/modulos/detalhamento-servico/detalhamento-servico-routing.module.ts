import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhamentoServicoFormComponent } from './detalhamento-servico-form/detalhamento-servico-form.component';
import { DetalhamentoServicoListComponent } from './detalhamento-servico-list/detalhamento-servico-list.component';

const routes: Routes = [
  { path: '', component: DetalhamentoServicoListComponent },
  { path: 'new', component: DetalhamentoServicoFormComponent },
  { path: 'editar/:id', component: DetalhamentoServicoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhamentoServicoRoutingModule { }
