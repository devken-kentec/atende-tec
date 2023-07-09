import { GlobalService } from './../../shared/global.service';
import { ServicoService } from './../../servico/shared/servico.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Servico } from '../../servico/shared/servico';
import { Unidade } from '../../unidade/shared/unidade';
import { RelatoriosService } from '../shared/relatorios.service';

@Component({
  selector: 'app-painel-relatorio-agendamento',
  templateUrl: './painel-relatorio-agendamento.component.html',
  styleUrls: ['./painel-relatorio-agendamento.component.css'],
  preserveWhitespaces: true
})
export class PainelRelatorioAgendamentoComponent implements OnInit {

  buscaAgendForm: FormGroup;
  quantitativoUnidade: [];
  quantitativoServico: [];
  unidades: Unidade[];
  servicos: Servico[];

  constructor(private relatoriosService: RelatoriosService,
              private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private servicoService: ServicoService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.comboBox();

    this.buscaAgendForm = this.fb.group({
      unidade:['',[]],
      dataInicial: ['',[]],
      dataFinal: ['',[]],
      servico:  ['',[]],
      statusAgendamento: ['',[]]
    });
  }

  comboBox(){
    this.unidadeService.listUnidadeGenerica(this.globalService.getRole(), this.globalService.getUnidadeId()).subscribe(
      dados=> this.unidades = dados
    );
    this.servicoService.listServico().subscribe(
      dados=> this.servicos = dados
    );
  }

  pesquisarUnidade(){

    let unidade = this.buscaAgendForm.get('unidade').value;
    let dataI = this.buscaAgendForm.get('dataInicial').value;
    let dataF = this.buscaAgendForm.get('dataFinal').value;
    let servico = this.buscaAgendForm.get('servico').value;
    let statusAgendamento = this.buscaAgendForm.get('statusAgendamento').value;

    this.relatoriosService.buscaAvancadaUnidadeAgendamento(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico, statusAgendamento).subscribe((res: any)=>{
        this.quantitativoUnidade = res
    });
  }

  limparListaUnidade(){
    this.quantitativoUnidade = null;
  }

  pesquisarServico(){

    let unidade = this.buscaAgendForm.get('unidade').value;
    let dataI = this.buscaAgendForm.get('dataInicial').value;
    let dataF = this.buscaAgendForm.get('dataFinal').value;
    let servico = this.buscaAgendForm.get('servico').value;
    let statusAgendamento = this.buscaAgendForm.get('statusAgendamento').value;

    this.relatoriosService.buscaAvancadaServicoAgendamento(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico, statusAgendamento).subscribe((res: any)=>{
        this.quantitativoServico = res
    });
  }

  limparListaServico(){
    this.quantitativoServico = null;
  }

  primeiroDia(dataInicial){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let now = new Date();
    if(dataInicial == ""){
      dataInicial = now.getFullYear()+"-"+monName[now.getMonth()] + "-" + "01";
    }
    return dataInicial;
  }

  ultimoDia(dataFinal){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let endDay = new Array ("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "30");
    let now = new Date();
    if(dataFinal == ""){
      dataFinal = now.getFullYear() +"-"+monName[now.getMonth()]+"-"+endDay[now.getMonth()];
    }
    return dataFinal;
  }

}
