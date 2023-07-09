import { RelatorioAtendenteListComponent } from './relatorio-atendente-list/relatorio-atendente-list.component';
import { RelatorioAtendimentoListComponent } from './relatorio-atendimento-list/relatorio-atendimento-list.component';
import { PainelRelatorioAgendamentoComponent } from './painel-relatorio-agendamento/painel-relatorio-agendamento.component';
import { PainelRelatorioComponent } from './painel-relatorio/painel-relatorio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'painelrelatorio', component: PainelRelatorioComponent },
  { path: 'painelrelatorioagendamento', component: PainelRelatorioAgendamentoComponent },
  { path: 'relatorioatendimentolist', component: RelatorioAtendimentoListComponent },
  { path: 'relatorioatendentelist', component: RelatorioAtendenteListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
