import { Router, ActivatedRoute } from '@angular/router';
import { Fila } from './../../ativacao/shared/fila';
import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from '../shared/atendimento.service';




@Component({
  selector: 'app-lista-atendimento-list',
  templateUrl: './lista-atendimento-list.component.html',
  styleUrls: ['./lista-atendimento-list.component.css']
})
export class ListaAtendimentoListComponent implements OnInit {

  filas: Fila[];
  nomeServidor: string;
  statusAtendendimento: string;

  constructor(public globalService: GlobalService,
              private atendimentoService: AtendimentoService,
              private router: Router,
              private route: ActivatedRoute) { }

ngOnInit(): void {

  const routeParams = this.route.snapshot.params;
  this.nomeServidor = routeParams.nome;
  this.statusAtendendimento = routeParams.status;

  this.listarFilaEspera();
}

listarFilaEspera(){
  this.atendimentoService.listarFilaEspera(this.globalService.getMatricula(), this.globalService.getUnidade()).subscribe(
      dados=> this.filas = dados
    );
  }

  pegarFila(id){
    this.router.navigate(['atendimento/atende/', id]);
  }

  mudarCor(priodidade: string){
    return priodidade == "Normal"? 'blue': 'red';
  }
}
