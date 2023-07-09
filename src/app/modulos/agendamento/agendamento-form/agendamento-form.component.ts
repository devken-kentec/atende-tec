import { GlobalService } from './../../shared/global.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { GradeService } from './../../grade/shared/grade.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css']
})
export class AgendamentoFormComponent implements OnInit {

  mostrarMens: boolean = false;
  id: number;
  dia: string;
  hIn: string;
  hFin: string;
  inter: number;
  uni: string;
  serv: string;
  quant: number;
  conf: string;
  ger: string

  constructor(private route: ActivatedRoute,
              private gradeService: GradeService,
              private agendamentoService: AgendamentoService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    const routeParans = this.route.snapshot.params;
    if(routeParans.id != null){
        this.gradeService.loadById(routeParans.id).subscribe(
          (dados: any) => { this.id = dados.id,
                            this.dia = dados.calendario.dia,
                            this.hIn = dados.horaInicial,
                            this.hFin = dados.horaFinal,
                            this.inter = dados.correcaoHora,
                            this.uni = dados.unidade.sigla,
                            this.serv = dados.servico.descricao,
                            this.quant = dados.quantidade,
                            this.conf = dados.configurado,
                            this.ger = dados.gerado
                          })
    }
  }

  confirmar(id){
    this.agendamentoService.create(id).subscribe(
      success => { this.globalService.saveShow("Gerado com Sucesso!", "Agendamento"), this.ger = "g"}
    );
        this.id = null;
        this.dia = "";
        this.hIn = "";
        this.hFin = "";
        this.inter = null;
        this.uni = "";
        this.serv = "";
        this.quant = null;

  }
}
