import { GlobalService } from './../../shared/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from './../../servico/shared/servico.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { Servico } from './../../servico/shared/servico';
import { Unidade } from './../../unidade/shared/unidade';
import { GradeService } from './../shared/grade.service';
import { Component, OnInit } from '@angular/core';
import { Grade } from '../shared/grade';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css'],
  preserveWhitespaces: true
})
export class GradeListComponent implements OnInit {

  grades: Grade[];
  mostrarMens: boolean = false;
  _id: string = "";
  _descricao: string = "";
  teste: boolean;
  buscaForm: FormGroup;
  unidades: Unidade[];
  servicos: Servico[];

  constructor(private gradeService: GradeService,
              private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private servicoService: ServicoService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService
              ) { }

  ngOnInit(): void {

    this.comboBox();

    this.buscaForm = this.fb.group({
      unidade:['',[]],
      dataInicial: ['',[]],
      dataFinal: ['',[]],
      servico:  ['',[]]
    });
  }

  listGrade(){
    this.gradeService.listGrade().subscribe(
      dados => this.grades = dados
    )
  }

  pesquisar(){
    let unidade = this.buscaForm.get('unidade').value;
    let dataI = this.buscaForm.get('dataInicial').value;
    let dataF = this.buscaForm.get('dataFinal').value;
    let servico = this.buscaForm.get('servico').value;

    this.gradeService.buscaAvancada(unidade, this.primeiroDia(dataI), this.ultimoDia(dataF), servico).subscribe(
      res => this.grades = res
    );
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
    this.servicoService.listServico().subscribe(
      dados=> this.servicos = dados
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  gerarAgendamento(id){
   this.router.navigate(['agendamento/new', id] );
  }
}
