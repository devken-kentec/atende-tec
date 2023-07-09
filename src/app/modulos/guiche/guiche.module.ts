import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GuicheRoutingModule } from './guiche-routing.module';
import { GuicheFormComponent } from './guiche-form/guiche-form.component';
import { GuicheListComponent } from './guiche-list/guiche-list.component';


@NgModule({
  declarations: [GuicheFormComponent, GuicheListComponent],
  imports: [
    CommonModule,
    GuicheRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class GuicheModule { }
