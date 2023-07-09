import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { OrgaoRoutingModule } from './orgao-routing.module';
import { OrgaoFormComponent } from './orgao-form/orgao-form.component';
import { OrgaoListComponent } from './orgao-list/orgao-list.component';


@NgModule({
  declarations: [OrgaoFormComponent, OrgaoListComponent],
  imports: [
    CommonModule,
    OrgaoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class OrgaoModule { }
