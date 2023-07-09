import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelRoutingModule } from './painel-routing.module';
import { PainelAListFormComponent } from './painel-a-list-form/painel-a-list-form.component';
import { PainelBListFormComponent } from './painel-b-list-form/painel-b-list-form.component';
import { PainelCListFormComponent } from './painel-c-list-form/painel-c-list-form.component';
import { PainelDListFormComponent } from './painel-d-list-form/painel-d-list-form.component';
import { PainelEListFormComponent } from './painel-e-list-form/painel-e-list-form.component';
import { PainelFListFormComponent } from './painel-f-list-form/painel-f-list-form.component';


@NgModule({
  declarations: [PainelAListFormComponent, PainelBListFormComponent, PainelCListFormComponent, PainelDListFormComponent, PainelEListFormComponent, PainelFListFormComponent],
  imports: [
    CommonModule,
    PainelRoutingModule
  ]
})
export class PainelModule { }
