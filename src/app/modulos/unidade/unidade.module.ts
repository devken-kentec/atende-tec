import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';


@NgModule({
  declarations: [UnidadeFormComponent, UnidadeListComponent],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UnidadeModule { }
