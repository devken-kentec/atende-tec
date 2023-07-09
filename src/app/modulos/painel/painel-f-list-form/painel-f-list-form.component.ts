import { take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { GlobalService } from './../../shared/global.service';
import { PainelService } from './../shared/painel.service';
import { Component, OnInit } from '@angular/core';
import { Painel } from '../shared/painel';

@Component({
  selector: 'app-painel-f-list-form',
  templateUrl: './painel-f-list-form.component.html',
  styleUrls: ['./painel-f-list-form.component.css']
})
export class PainelFListFormComponent implements OnInit {

  title: string  = "Painel de Chamada da Unidade de Atendimento CRC";
  paineis: Painel[];
  id: number;
  filaId: number;
  senha: string;
  guiche: string;
  servico: string;
  unidade: string;
  data: string;
  hora: string;
  prioridade: string;
  n: number = 10800;
  status: string = "Ligado";

  constructor(private painelService: PainelService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    const tempo = interval(5000);

    const periodo = tempo.pipe(take(this.n));

    periodo.subscribe((t)=>{
      console.log("Chamando");
      this.listarPainelF();
      this.listarChamadaF();
      
    });
  }

  desligar(){
    this.n = 3;
    this.status = "Desligado";
  }

  listarChamadaF(){
    this.painelService.findByChamadaF().subscribe((chamada: any)=>{
      this.id = chamada.id;
      this.filaId = chamada.filaId;
      this.senha = chamada.senha;
      this.guiche = chamada.guiche;
      this.servico = chamada.servico;
      this.unidade = chamada.unidade;
      this.data = this.globalService.formatarDate(chamada.chamada);
      this.hora = this.globalService.formatarTime(chamada.chamada);   
      this.prioridade = chamada.prioridade;
       }
    ); 
  }

  listarPainelF(){
    this.painelService.findByPainelF().subscribe(
      dados => this.paineis = dados
    );
  }

  formatarData(data: string){
    let date = this.globalService.formatarDate(data);
    return date 
  }

  formatarHora(hora: string){
    let time = this.globalService.formatarTime(hora);
    return time;
  }
  mudarCor(priodidade: string){
    return priodidade == "Normal"? 'blue': 'red';
  }

}
