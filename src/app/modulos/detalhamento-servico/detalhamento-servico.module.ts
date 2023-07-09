import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DetalhamentoServicoRoutingModule } from './detalhamento-servico-routing.module';
import { DetalhamentoServicoFormComponent } from './detalhamento-servico-form/detalhamento-servico-form.component';
import { DetalhamentoServicoListComponent } from './detalhamento-servico-list/detalhamento-servico-list.component';


@NgModule({
  declarations: [DetalhamentoServicoFormComponent, DetalhamentoServicoListComponent],
  imports: [
    CommonModule,
    DetalhamentoServicoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DetalhamentoServicoModule { }
