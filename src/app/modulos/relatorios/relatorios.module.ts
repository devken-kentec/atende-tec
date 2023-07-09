import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { PainelRelatorioComponent } from './painel-relatorio/painel-relatorio.component';
import { PainelRelatorioAgendamentoComponent } from './painel-relatorio-agendamento/painel-relatorio-agendamento.component';
import { RelatorioAtendimentoListComponent } from './relatorio-atendimento-list/relatorio-atendimento-list.component';
import { RelatorioAtendenteListComponent } from './relatorio-atendente-list/relatorio-atendente-list.component';



@NgModule({
  declarations: [PainelRelatorioComponent, PainelRelatorioAgendamentoComponent, RelatorioAtendimentoListComponent, RelatorioAtendenteListComponent ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class RelatoriosModule { }
