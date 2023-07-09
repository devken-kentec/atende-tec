import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ServidorRoutingModule } from './servidor-routing.module';
import { ServidorListComponent } from './servidor-list/servidor-list.component';
import { ServidorFormComponent } from './servidor-form/servidor-form.component';


@NgModule({
  declarations: [ServidorListComponent, ServidorFormComponent],
  imports: [
    CommonModule,
    ServidorRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ServidorModule { }
