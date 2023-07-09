import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfilAtendimentoRoutingModule } from './perfil-atendimento-routing.module';
import { PerfilAtendimentoFormComponent } from './perfil-atendimento-form/perfil-atendimento-form.component';


@NgModule({
  declarations: [PerfilAtendimentoFormComponent],
  imports: [
    CommonModule,
    PerfilAtendimentoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PerfilAtendimentoModule { }
