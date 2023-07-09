import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AcessoRoutingModule } from './acesso-routing.module';
import { AcessoListComponent } from './acesso-list/acesso-list.component';
import { AcessoFormComponent } from './acesso-form/acesso-form.component';


@NgModule({
  declarations: [AcessoListComponent, AcessoFormComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AcessoModule { }
