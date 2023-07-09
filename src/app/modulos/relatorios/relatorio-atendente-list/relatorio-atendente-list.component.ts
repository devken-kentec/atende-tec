import { RelatoriosService } from './../shared/relatorios.service';
import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { Atendente } from '../../atendimento/shared/atendente';

@Component({
  selector: 'app-relatorio-atendente-list',
  templateUrl: './relatorio-atendente-list.component.html',
  styleUrls: ['./relatorio-atendente-list.component.css']
})
export class RelatorioAtendenteListComponent implements OnInit {

  matricula: string;
  atendentes: Atendente[];

  constructor(private globalService: GlobalService, private relatorioService: RelatoriosService) { }

  ngOnInit(): void {
    this.listarAtendenteUnidade(this.globalService.getUnidade());
  }

  listarAtendenteUnidade(unidade){
    this.relatorioService.listarAtendente(unidade).subscribe(
        dados => this.atendentes = dados
    );
  }

  pegarDados(matricula){
    this.matricula = matricula;
  }

}
