import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuralRoutingModule } from './mural-routing.module';
import { MuralListComponent } from './mural-list/mural-list.component';
import { MuralFormComponent } from './mural-form/mural-form.component';


@NgModule({
  declarations: [MuralListComponent, MuralFormComponent],
  imports: [
    CommonModule,
    MuralRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class MuralModule { }
