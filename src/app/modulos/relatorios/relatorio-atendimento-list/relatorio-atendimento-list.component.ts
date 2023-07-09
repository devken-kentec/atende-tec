import { Atendimento } from './../../atendimento/shared/atendimento';
import { RelatoriosService } from './../shared/relatorios.service';
import { GlobalService } from './../../shared/global.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Unidade } from '../../unidade/shared/unidade';

@Component({
  selector: 'app-relatorio-atendimento-list',
  templateUrl: './relatorio-atendimento-list.component.html',
  styleUrls: ['./relatorio-atendimento-list.component.css']
})
export class RelatorioAtendimentoListComponent implements OnInit {

  buscarForm: FormGroup;
  unidades: Unidade[];
  atendimentos: Atendimento[];
  somatorio:[];

  constructor(private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private globalService: GlobalService,
              private relatorioService: RelatoriosService
              ) { }

  ngOnInit(): void {
    this.comboBox();
    this.buscarForm = this.fb.group({
      unidade:['',[]],
      dataInicial: ['',[]],
      dataFinal: ['',[]],
      matricula:  ['',[]],
      nome: ['',[]]
    });
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

  comboBox(){
    this.unidadeService.listUnidadeGenerica(this.globalService.getRole(), this.globalService.getUnidadeId()).subscribe(
      dados=> this.unidades = dados
    );
  }


  pesquisar(){
    let unidade = this.buscarForm.get('unidade').value;
    let dataI = this.buscarForm.get('dataInicial').value;
    let dataF = this.buscarForm.get('dataFinal').value;
    let matricula = this.buscarForm.get('matricula').value;
    let nome = this.buscarForm.get('nome').value;

    this.relatorioService.buscaAvancadaAgendamentoDiario(unidade, dataI, dataF,  matricula, nome).subscribe((dados: any)=>{
            this.atendimentos = dados, this.somar(unidade, dataI, dataF,  matricula, nome)
      }
    );
  }

  somar(unidade, dataInicial, dataFinal, matricula, nome){
          this.relatorioService.somarAtendimento(unidade, dataInicial, dataFinal, matricula, nome).subscribe((res:any)=>{
               this.somatorio = res
          }
          );
  }

}
