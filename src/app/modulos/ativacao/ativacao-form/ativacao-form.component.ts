import { AgendamentoService } from './../../agendamento/shared/agendamento.service';
import { AtivacaoService } from './../shared/ativacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DetalhamentoServico } from '../../detalhamento-servico/shared/detalhamento-servico';

@Component({
  selector: 'app-ativacao-form',
  templateUrl: './ativacao-form.component.html',
  styleUrls: ['./ativacao-form.component.css']
})
export class AtivacaoFormComponent implements OnInit {

  ativaForm: FormGroup;

  identificador: number;
  senha: string;
  nome: string;
  cpfCnpj: string;
  unidade: string;
  endereco: string;
  data: string;
  horario: string;
  servico: string;
  detalhamentoServico: string;
  statusAgendamento: string;
  prioridade: string;
  mostra: boolean = false;
  proximo: boolean = false;
  btnAtivarSenha: boolean = false;
  detalhamentoServicos: DetalhamentoServico[];

  constructor(private fb: FormBuilder,
              private ativacaoService: AtivacaoService ) { }

  ngOnInit(): void {

    this.ativaForm = this.fb.group({
      id: [null, []],
      identificador: ['', []],
      senha: ['', []],
      nome: ['', []],
      cpfCnpj: ['', []],
      unidade: ['', []],
      endereco: ['', []],
      data: ['', []],
      horario: ['', []],
      servico: ['', []],
      detalhamentoServicoId: ['', [Validators.required]],
      detalhamentoServico: ['', []],
      statusAgendamento: ['', []],
      prioridade: ['', [Validators.required]],
    });
  }

  senhaById(){
    this.ativacaoService.senhaById(this.ativaForm.get('id').value).subscribe((senha: any)=>{
          this.proximo = false;
          this.identificador = senha.identificador;
          this.senha = senha.senha;
          this.nome = senha.nome;
          this.cpfCnpj = senha.cpfCnpj;
          this.unidade = senha.unidade;
          this.endereco = senha.endereco;
          this.data = senha.data;
          this.horario = senha.horario;
          this.servico = senha.servico;
          this.detalhamentoServico = senha.detalhamentoServico;
          this.statusAgendamento = senha.statusAgendamento;
          this.prioridade = senha.prioridade;
          this.mostra = true;
          this.carregarDados(senha);
          this.combobox(this.servico);
    }
    );
  }

  carregarDados(senha){
    this.ativaForm.patchValue(senha);
  }

  atualizarAgendamento(){
    let identificador = this.ativaForm.get('identificador').value;
    let prioridade = this.ativaForm.get('prioridade').value;
    let detalhamentoServicoId: number = this.ativaForm.get('detalhamentoServicoId').value;

    this.ativacaoService.atualizarAgendamento(identificador, prioridade, detalhamentoServicoId).subscribe(
        success => { this.btnAtivarSenha = true, this.senhaById() }
    );
  }

  combobox(servico){
    this.ativacaoService.listDetalhamentoServico(servico).subscribe(
      dados => this.detalhamentoServicos = dados
    );
  }

  formatarDate(data: string){
    let dataCompleta = "";

			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);

       if(dia.length == 1){
        dia = "0" + dia;
     }

     if(mes.length == 1){
       mes = "0" + mes
     }
       dataCompleta = dia+"/"+mes+"/"+ano

		 return dataCompleta;
  }

  formatarPessoas(pfj: string){
    let res: string;
    if(pfj.length == 11 ){
      res = this.formatarCpf(pfj);
    }

    if(pfj.length == 14 ){
      res = this.formatarCnpj(pfj);
    }
    return res;
  }

  formatarCpf(cpf){
    let str:string = cpf;
    let p1 = str.substring(0, 3);
    let p2 = str.substring(3, 6);
    let p3 = str.substring(6, 9);
    let p4 = str.substring(9, 11);
      cpf = p1 + "." + p2 + "." + p3 + "-" + p4;
    return cpf
   }

   formatarCnpj(cnpj){
     let str: string = cnpj;

     let p1 = str.substring(0, 2);
     let p2 = str.substring(2, 5);
     let p3 = str.substring(5, 8);
     let p4 = str.substring(8, 12);
     let p5 = str.substring(12, 14);

      cnpj = p1 + "." + p2 + "." + p3 + "/" + p4 + "-" + p5;

      return cnpj;
    }

    ativar(){
      this.mostra = false;
      this.ativacaoService.updateAgendamento(this.ativaForm.get('id').value).subscribe(
        success => { this.onSubmit() }
      );
    }

    onSubmit(){
      this.ativaForm.get('id').disable();

      this.ativacaoService.create(this.ativaForm.value).subscribe(
        success => { this.proximo = true, this.ativaForm.get('id').enable() }
      );
    }

}
