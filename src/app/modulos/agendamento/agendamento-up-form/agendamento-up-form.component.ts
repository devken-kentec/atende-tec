import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../shared/agendamento.service';

@Component({
  selector: 'app-agendamento-up-form',
  templateUrl: './agendamento-up-form.component.html',
  styleUrls: ['./agendamento-up-form.component.css']
})
export class AgendamentoUpFormComponent implements OnInit {

  agenUpForm: FormGroup;
  dataFormatada;
  adicCPF: boolean = false;
  incluirCpf: any;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private agendamentoService: AgendamentoService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;

    if(routeParans.id != null){
      this.agendamentoService.loadById(routeParans.id).subscribe((agendamento: any)=>{
          this.updateAgenUpForm(agendamento)
      });
    }

    this.agenUpForm = this.fb.group({
      id: [null, []],
      horario: ['', []],
      sequencial: ['', []],
      prioridade: ['', []],
      senha: ['', []],
      statusAgendamento: ['', []],
      cpfCnpjAvulso: ['', []],
      cpfCnpjNovo: ['', []],
      grade: this.fb.group({
        id:['', []],
        intervalo:['', []],
        quantidade:['', []],
        correcaoHora:['', []],
        horaInicial:['', []],
        horaFinal:['', []],
        configurado:['', []],
        gerado:['', []],
        unidade: this.fb.group({
          id:['', []],
          sigla:['', []],
          descricao:['', []],
          endereco: ['', []],
          codigo:['', []],
          telefone:['', []]
        }),
        calendario: this.fb.group({
          id:['', []],
          dia:['', []],
          observacao:['', []]
        }),
        servico: this.fb.group({
          id:['', []],
          sigla:['', []],
          descricao:['', []],
          orgao: this.fb.group({
            id:['', []],
            sigla:['', []],
            codigo:['', []],
            descricao:['', []]
          })
        }),
      }),
      detalhamentoService:['', []],
      contribuinte:this.fb.group({
        id: ['', []],
        nome: ['', []],
        cpfCnpj: ['', []],
        email: ['', []],
        fone: ['', []],
        senha: ['', []]
      })
    });
  }

  updateAgenUpForm(agendamento){
    this.agenUpForm.patchValue(agendamento);
  }

  encaixeTecnico() {
     let avulso: string = "99999999999";
     this.agenUpForm.get("cpfCnpjAvulso").setValue(avulso);
  }

  adicionaCpf(){
    this.adicCPF = true
  }

  novoCpf(){
    let novo = this.agenUpForm.get("cpfCnpjNovo").value;
    this.agenUpForm.get("cpfCnpjAvulso").setValue(novo);
  }

  incluir(){
    let id = this.agenUpForm.get("id").value;
    let cpfCnpj = this.agenUpForm.get("cpfCnpjAvulso").value;

    this.agendamentoService.encaixeTecnico(id, cpfCnpj).subscribe(
      success => { this.globalService.saveShow("Realizado com Sucesso!", "Encaixe") },
      error => { this.globalService.alertShow("Algo está errado!", "OPS!")}
    );
  }

}
