import { PainelFListFormComponent } from './painel-f-list-form/painel-f-list-form.component';
import { PainelEListFormComponent } from './painel-e-list-form/painel-e-list-form.component';
import { PainelDListFormComponent } from './painel-d-list-form/painel-d-list-form.component';
import { PainelCListFormComponent } from './painel-c-list-form/painel-c-list-form.component';
import { PainelBListFormComponent } from './painel-b-list-form/painel-b-list-form.component';
import { PainelAListFormComponent } from './painel-a-list-form/painel-a-list-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '01', component: PainelAListFormComponent },
  { path: '02', component: PainelBListFormComponent },
  { path: '03', component: PainelCListFormComponent },
  { path: '04', component: PainelDListFormComponent },
  { path: '05', component: PainelEListFormComponent },
  { path: '06', component: PainelFListFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
