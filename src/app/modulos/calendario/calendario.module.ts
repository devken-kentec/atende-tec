import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioFormComponent } from './calendario-form/calendario-form.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';
import { CalendarioFormAlteracaoComponent } from './calendario-form-alteracao/calendario-form-alteracao.component';


@NgModule({
  declarations: [CalendarioFormComponent, CalendarioListComponent, CalendarioFormAlteracaoComponent],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CalendarioModule { }
