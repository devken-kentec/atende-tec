import { GlobalService } from './../../shared/global.service';
import { Fila } from './../shared/fila';
import { AtivacaoService } from './../shared/ativacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ativacao-list',
  templateUrl: './ativacao-list.component.html',
  styleUrls: ['./ativacao-list.component.css']
})
export class AtivacaoListComponent implements OnInit {

  constructor(private ativacaoService: AtivacaoService,
              public globalService: GlobalService) { }

  filas: Fila[];

  ngOnInit(): void {
    this.listarFilaAtivados();
  }

  listarFilaAtivados(){
    this.ativacaoService.listarFilaAtivados(this.globalService.getUnidade()).subscribe(
        dados => this.filas = dados
    );
  }


}
