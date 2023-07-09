import { GlobalService } from './../../shared/global.service';
import { CalendarioService } from './../shared/calendario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario-form-alteracao',
  templateUrl: './calendario-form-alteracao.component.html',
  styleUrls: ['./calendario-form-alteracao.component.css']
})
export class CalendarioFormAlteracaoComponent implements OnInit {

  calAltForm: FormGroup;
  dataInicial: string;
  dataFinal: string;
  mostrarMens: boolean = false;
  mess: string = "";

  constructor(private fb: FormBuilder,
              private calendarioService: CalendarioService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.calAltForm = this.fb.group({

      dataInicial: ['', []],
      dataFinal: ['', []]

    });
  }

  alterarStatus(){
    this.dataInicial = this.globalService.formatarDate(this.calAltForm.get('dataInicial').value);
    this.dataFinal = this.globalService.formatarDate(this.calAltForm.get('dataFinal').value);
  }

  inativar(){

    let dataInicial = this.calAltForm.get('dataInicial').value;
    let dataFinal = this.calAltForm.get('dataFinal').value;

    this.calendarioService.inativarDias(dataInicial, dataFinal).subscribe(
      success => {console.log("")},
      erro =>{ this.mostrarMens = !this.mostrarMens,
               this.globalService.saveShow('Inativado com Sucesso!', 'Calendário') }
      );
  }
}
