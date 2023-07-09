import { DetalhamentoServicoService } from './../../detalhamento-servico/shared/detalhamento-servico.service';
import { DetalhamentoServico } from './../../detalhamento-servico/shared/detalhamento-servico';
import { AtendimentoService } from './../shared/atendimento.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atendendo-atendimento-form',
  templateUrl: './atendendo-atendimento-form.component.html',
  styleUrls: ['./atendendo-atendimento-form.component.css'],

})
export class AtendendoAtendimentoFormComponent implements OnInit {

  mostrarForm: boolean = false;
  reagendForm: boolean = false;
  mostrarMens: boolean = false;
  _mostrarMens: boolean = false;
  btnComecar: boolean = false;
  btnChamar: boolean = true;
  btnFinalizar: boolean = false;
  btnIncluir: boolean = true;
  reagendar: boolean = false;
  atendimentoForm: FormGroup;
  id: number;
  identificador: number;
  cpfCnpj: string;
  data: string;
  horario: string;
  nome: string;
  prioridade: string;
  senha: string;
  servico: string;
  detalhamentoServico: string;
  statusFila: string;
  matricula: string;
  servidor: string;
  statusAtendente: string;
  guiche: string;
  delServicos: DetalhamentoServico[];
  detalhamentoServicosPerfil: DetalhamentoServico [];
  cont: number = 0;
  contI: number = 1;

  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private route: ActivatedRoute,
              private atendimentoService: AtendimentoService,
              private detalhamentoServicoService: DetalhamentoServicoService) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.buscarAtendimento(routeParams.id);
    this.buscarAtendente();
    this.comboBox();

    this.atendimentoForm = this.fb.group({
       id: ['', []],
       descricao: ['', []],
       servidor: ['', []],
       detalhamentoServico: ['', []],
       fila: ['', []]
    });
  }

  buscarAtendente(){
    this.atendimentoService.loadByMatricula(this.globalService.getMatricula()).subscribe((res:any)=>{
        this.matricula = res.acesso.servidor.matricula;
        this.servidor = res.acesso.servidor.nome;
        this.statusAtendente = res.statusAtendente;
        this.guiche = res.guiche.descricao;
        this.atendimentoForm.get('servidor').setValue(this.matricula);
    });
  }

  buscarAtendimento(id){
      this.atendimentoService.loadById(id).subscribe((dados: any)=>{
          this.id = dados.id,
          this.identificador = dados.identificador,
          this.cpfCnpj = this.globalService.formatarPessoas(dados.cpfCnpj),
          this.data = this.globalService.formatarDate(dados.data),
          this.horario = dados.horario,
          this.nome = dados.nome,
          this.prioridade = dados.prioridade,
          this.senha = dados.senha,
          this.servico = dados.servico,
          this.detalhamentoServico = dados.detalhamentoServico,
          this.statusFila = dados.statusFila,
          this.atendimentoForm.get('fila').setValue(this.id);
      });
  }

  onCall(){
    let fila = this.atendimentoForm.get('fila').value;
    let servidor = this.atendimentoForm.get('servidor').value;

    this.atendimentoService.createChamar(fila, servidor).subscribe(
      success => { this.globalService.alertShow(this.cont + "X","Chamando...") });

        this.btnComecar = true;
        this.btnFinalizar = true;
        this.cont = this.cont + 1;
  }

  onStart(){
    this.mostrarForm = !this.mostrarForm;
    this.btnChamar = !this.btnChamar;
    let fila = this.atendimentoForm.get('fila').value;

    this.atendimentoService.createComecar(fila).subscribe(
      success => { console.log("Chamei")}
    );
  }

  onInclude(){
    this.atendimentoService.createAtendimento(this.atendimentoForm.value).subscribe(
      success => { this.globalService.saveShow("Incluido com Sucesso!","Serviço") }
    );

    this.atendimentoForm.get('descricao').setValue("");
    this.atendimentoForm.get('detalhamentoServico').setValue("");
    this.contI = this.contI + 1;

    if (this.contI == 6){
      this.btnIncluir = false;
    }
  }

  onIncludeNew(){
    let fila = this.atendimentoForm.get('fila').value;
    let detalhamentoServico = this.atendimentoForm.get('detalhamentoServico').value;

    this.atendimentoService.createReagendar(fila, detalhamentoServico).subscribe(
      success => { this.globalService.infoShow("Incluido com Sucesso!","Re-agendamento"), this.btnFinalizar = false}
    );
  }

  onEnd(){
    let fila = this.atendimentoForm.get('fila').value;

    this.atendimentoService.createFinalizar(fila).subscribe(
      success => { this.btnComecar = false,
                   this.btnChamar = false,
                   this.reagendar = true,
                   this.mostrarForm = false,
                   this.btnFinalizar = !this.btnFinalizar,
                   this.globalService.infoShow("Finalizado com Sucesso!", "Atendimento")}
    );
  }

  onReagend(){
    this.reagendForm = true;
  }

  comboBox(){
    this.detalhamentoServicoService.listDetalhamentoServicoAtendimento().subscribe(
      dados => this.delServicos = dados
    );


    this.detalhamentoServicoService.listDetalhamentoServico().subscribe(
      dados=> this.detalhamentoServicosPerfil = dados
    );

  }

  mudarCor(priodidade: string){
    return priodidade == "Normal"? 'blue': 'red';
  }

}
