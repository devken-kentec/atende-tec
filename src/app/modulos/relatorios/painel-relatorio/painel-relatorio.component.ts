import { ServicoService } from './../../servico/shared/servico.service';
import { GlobalService } from './../../shared/global.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../shared/relatorios.service';
import { Unidade } from '../../unidade/shared/unidade';
import { Servico } from '../../servico/shared/servico';

@Component({
  selector: 'app-painel-relatorio',
  templateUrl: './painel-relatorio.component.html',
  styleUrls: ['./painel-relatorio.component.css'],
  preserveWhitespaces: true
})
export class PainelRelatorioComponent implements OnInit {

  buscaUniForm: FormGroup;
  quantitativoUnidade: [];
  quantitativoServico: [];
  unidades: Unidade[];
  servicos: Servico[];

  constructor(private relatoriosService: RelatoriosService,
              private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private globalService: GlobalService,
              private servicoService: ServicoService) { }

  ngOnInit(): void {

    this.comboBox();

    this.buscaUniForm = this.fb.group({
        dataInicial: ['', []],
        dataFinal: ['', []],
        unidade: ['', []],
        servico: ['', []]
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
    let unidade = this.buscaUniForm.get('unidade').value;
    let dataI = this.buscaUniForm.get('dataInicial').value;
    let dataF = this.buscaUniForm.get('dataFinal').value;
    let servico = this.buscaUniForm.get('servico').value;

    this.relatoriosService.buscaAvancadaUnidadeGrade(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico).subscribe((res:any) =>
        { this.quantitativoUnidade = res }
      );
  }

  limparListaUnidade(){
    this.quantitativoUnidade = null;
  }

  pesquisarServico(){
    let unidade = this.buscaUniForm.get('unidade').value;
    let dataI = this.buscaUniForm.get('dataInicial').value;
    let dataF = this.buscaUniForm.get('dataFinal').value;
    let servico = this.buscaUniForm.get('servico').value;

    this.relatoriosService.buscaAvancadaServicoGrade(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico).subscribe((res:any) =>
        { this.quantitativoServico = res }
      );
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
