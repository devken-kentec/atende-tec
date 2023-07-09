import { GlobalService } from './../../shared/global.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento-exclusao',
  templateUrl: './agendamento-exclusao.component.html',
  styleUrls: ['./agendamento-exclusao.component.css']
})
export class AgendamentoExclusaoComponent implements OnInit {

  agendExForm: FormGroup;

  constructor(private fb: FormBuilder,
              private agendamentoService: AgendamentoService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.agendExForm = this.fb.group({
        gradeId: ['', [Validators.required]]
    });
  }

  excluirAgendamento(){
    if(this.agendExForm.valid){
      this.agendamentoService.excluirAgendamento(this.agendExForm.get("gradeId").value).subscribe(
        success => {console.log("")},
        erro => { this.globalService.saveShow("Removido com Sucesso!", "Agendamento")}
      );
    }
  }

}
