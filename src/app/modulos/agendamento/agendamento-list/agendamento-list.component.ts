import { GlobalService } from './../../shared/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from './../../servico/shared/servico.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { Servico } from './../../servico/shared/servico';
import { Unidade } from './../../unidade/shared/unidade';
import { Agendamento } from './../shared/agendamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoListComponent implements OnInit {

  mostrarMens: boolean = false;
  buscaForm: FormGroup;
  paginaForm: FormGroup;
  agendamentos: Agendamento[];
  unidades: Unidade[];
  servicos: Servico[];
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private agendamentoService: AgendamentoService,
              private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private servicoService: ServicoService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService ) { }


  ngOnInit(): void {
    this.comboBox();
    this.listarAgendaPaginada(this.pagina, this.tamanho);

    this.buscaForm = this.fb.group({
      unidade:['',[]],
      dataInicial: ['',[]],
      dataFinal: ['',[]],
      servico:  ['',[]],
      statusAgendamento: ['',[]]
    });

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
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

  listarAgenda(){
    this.agendamentoService.listAgenda().subscribe(
      dados =>  this.agendamentos = dados
    );
  }

  pesquisar(){
    let unidade = this.buscaForm.get('unidade').value;
    let dataI = this.buscaForm.get('dataInicial').value;
    let dataF = this.buscaForm.get('dataFinal').value;
    let servico = this.buscaForm.get('servico').value;
    let statusAgendamento = this.buscaForm.get('statusAgendamento').value;

    this.agendamentoService.buscaAvancada(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico, statusAgendamento).subscribe(
      res => this.agendamentos = res
    );
  }

  //Paginação
  listarAgendaPaginada(page, size){
    this.agendamentoService.listAgendaPaginada(page, size).subscribe(
          response => { this.agendamentos = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarAgendaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarAgendaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarAgendaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  //Formatações
  tiraNull(teste: any){
    let s: string = "";
    if(teste == null){
      s = "⌛";
    }
    return s;
  }

  editUp(id){
    this.router.navigate(['edit', id], { relativeTo: this.route });
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



