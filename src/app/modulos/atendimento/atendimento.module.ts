import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { InicialAtendimentoFormComponent } from './inicial-atendimento-form/inicial-atendimento-form.component';
import { ListaAtendimentoListComponent } from './lista-atendimento-list/lista-atendimento-list.component';
import { AtendendoAtendimentoFormComponent } from './atendendo-atendimento-form/atendendo-atendimento-form.component';


@NgModule({
  declarations: [InicialAtendimentoFormComponent, ListaAtendimentoListComponent, AtendendoAtendimentoFormComponent],
  imports: [
    CommonModule,
    AtendimentoRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AtendimentoModule { }
