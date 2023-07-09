import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContribuinteRoutingModule } from './contribuinte-routing.module';
import { ContribuinteListComponent } from './contribuinte-list/contribuinte-list.component';
import { ContribuinteFormComponent } from './contribuinte-form/contribuinte-form.component';


@NgModule({
  declarations: [ContribuinteListComponent, ContribuinteFormComponent],
  imports: [
    CommonModule,
    ContribuinteRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ContribuinteModule { }
