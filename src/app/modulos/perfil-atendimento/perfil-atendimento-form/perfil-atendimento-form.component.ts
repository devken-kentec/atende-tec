import { GlobalService } from './../../shared/global.service';
import { PerfilAtendimentoService } from './../shared/perfil-atendimento.service';
import { DetalhamentoServicoService } from './../../detalhamento-servico/shared/detalhamento-servico.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Servidor } from '../../servidor/shared/servidor';
import { ServidorService } from '../../servidor/shared/servidor.service';
import { DetalhamentoServico } from '../../detalhamento-servico/shared/detalhamento-servico';
import { PerfilAtendimento } from '../shared/perfil-atendimento';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil-atendimento-form',
  templateUrl: './perfil-atendimento-form.component.html',
  styleUrls: ['./perfil-atendimento-form.component.css']
})
export class PerfilAtendimentoFormComponent implements OnInit {

  mostrarMens: boolean = false;
  resOk: boolean = false;
  resError: string = null;
  perfilForm: FormGroup;
  servidores: Servidor[];
  delServicos: DetalhamentoServico[];
  perfilAtendimentos: PerfilAtendimento[];
  pegarMaricula: string;
  _id: number;
  _detalhamento: string;

  constructor(private fb: FormBuilder,
              private servidorService: ServidorService,
              private detalhamentoServicoService: DetalhamentoServicoService,
              private perfilAtendimentoService: PerfilAtendimentoService,
              protected globalService: GlobalService) { }

  ngOnInit(): void {

    this.combobox();

    this.perfilForm = this.fb.group({
      id: [null, []],
      matricula: ['',[]],
      servico: ['', []]
    });
  }

  combobox(){
    this.servidorService.listServidor().subscribe(
      dados => this.servidores = dados
    );
    this.detalhamentoServicoService.listDetalhamentoServico().subscribe(
      dados => this.delServicos = dados
    );
  }

  listarPerfil(matricula){
    this.perfilAtendimentoService.loadById(matricula).subscribe(
      dados => {this.perfilAtendimentos = dados, this.resError = null }
    );
  }

  onSubmit(){

    let matricula = this.perfilForm.get('matricula').value;
    let servico = this.perfilForm.get('servico').value;

    servico.forEach(element => {
      this.perfilAtendimentoService.createPerfil(matricula, element).subscribe(
        success => { this.listarPerfil(matricula) }, (error: any)=>{ this.resError = "O SERVIDOR AINDA NÃO POSSUE ACESSO DEFINIDO!" } );
    });
        this.globalService.saveShow("Salvo com Sucesso!", "Perfil")
  }

  pegarDados(id, detalhamento){
    this._id = id;
    this._detalhamento = detalhamento;
  }

  onDelete(){
    this.perfilAtendimentoService.remove(this._id).subscribe(
      success => {
        this.listarPerfil(this.perfilForm.get('matricula').value),
        this.globalService.removeShow("Removido com Sucesso!", this._detalhamento)
      }
    );
  }

}
