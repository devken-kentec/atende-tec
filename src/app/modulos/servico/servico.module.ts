import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListComponent } from './servico-list/servico-list.component';


@NgModule({
  declarations: [ServicoFormComponent, ServicoListComponent],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ServicoModule { }
