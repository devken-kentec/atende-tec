import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CalendarioService } from './../shared/calendario.service';
import { Calendario } from './../shared/calendario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendario-list',
  templateUrl: './calendario-list.component.html',
  styleUrls: ['./calendario-list.component.css'],
  preserveWhitespaces: true
})
export class CalendarioListComponent implements OnInit {

  calendarios: Calendario[];
  mostrarMens: boolean = false;
  _id: string = "";
  _dia: string = "";
  calForm:  FormGroup;

  constructor(private calendarioService: CalendarioService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.calForm = this.fb.group({
      dataInicial: ['',[]],
      dataFinal: ['', []],
      observacao: ['', []],
      statusCalendario: ['', []]
    });

  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  listCalendario(){
    this.calendarioService.listCalendario().subscribe(
      dados => this.calendarios = dados
    );
  }

  pegaDados(id, dia){
    this._id = id;
    this._dia = dia;
  }

  onDelete(){
    this.calendarioService.remove(this._id).subscribe(
      success => { this.globalService.removeShow('Excluiodo com Sucesso!', 'Calendário'), this.listCalendario() }
    )
  }

  pesquisar(){

    let dataInicial = this.calForm.get('dataInicial').value;
    let dataFinal = this.calForm.get('dataFinal').value;
    let statusCalendario = this.calForm.get('statusCalendario').value;
    let observacao = this.calForm.get('observacao').value;

    this.calendarioService.buscaAvancada(this.primeiroDia(dataInicial), this.ultimoDia(dataFinal), statusCalendario, observacao).subscribe(
      dados=> this.calendarios = dados
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

}
