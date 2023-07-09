import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AtivacaoRoutingModule } from './ativacao-routing.module';
import { AtivacaoFormComponent } from './ativacao-form/ativacao-form.component';
import { AtivacaoListComponent } from './ativacao-list/ativacao-list.component';


@NgModule({
  declarations: [AtivacaoFormComponent, AtivacaoListComponent],
  imports: [
    CommonModule,
    AtivacaoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AtivacaoModule { }
