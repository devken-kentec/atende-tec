import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeLiberacaoFormComponent } from './grade-liberacao-form/grade-liberacao-form.component';
import { GradeMultiFormComponent } from './grade-multi-form/grade-multi-form.component';



@NgModule({
  declarations: [GradeFormComponent, GradeListComponent, GradeLiberacaoFormComponent, GradeMultiFormComponent],
  imports: [
    CommonModule,
    GradeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class GradeModule { }
