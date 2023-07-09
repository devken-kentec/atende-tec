import { Atendimento } from './../../atendimento/shared/atendimento';
import { tap, take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Atendente } from '../../atendimento/shared/atendente';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private readonly API = `${environment.API}/atendeTec/api/relatorios`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(`${this.API}/unidade`).pipe(
      take(1)
    );
  }

  buscaAvancadaUnidadeGrade(unidade, dataInicial, dataFinal, servico){

    const httParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("servico", servico);
    const url = this.API + "/grade/unidade?" + httParams;

    return this.http.get(url).pipe(
      take(1)
    );
  }

  buscaAvancadaServicoGrade(unidade, dataInicial, dataFinal, servico){

  const httParams = new HttpParams()
  .set("unidade", unidade)
  .set("dataInicial", dataInicial)
  .set("dataFinal", dataFinal)
  .set("servico", servico);
  const url = this.API + "/grade/servico?" + httParams;

  return this.http.get(url).pipe(
    take(1)
  );
  }

  buscaAvancadaUnidadeAgendamento(unidade, dataInicial, dataFinal, servico, statusAgendamento){
    const httpParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("servico", servico)
    .set("statusAgendamento", statusAgendamento)
    const url = this.API + "/agendamento/unidade?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  buscaAvancadaServicoAgendamento(unidade, dataInicial, dataFinal, servico, statusAgendamento){
    const httpParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("servico", servico)
    .set("statusAgendamento", statusAgendamento)
    const url = this.API + "/agendamento/servico?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  buscaAvancadaAgendamentoDiario(unidade, dataInicial, dataFinal, matricula, nome){
    const httpParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("matricula", matricula)
    .set("nome", nome)
    const url = this.API + "/atendimento/diario?" + httpParams;
    return this.http.get<Atendimento[]>(url).pipe(
      take(1)
    );
  }

  somarAtendimento(unidade, dataInicial, dataFinal, matricula, nome){
    const httpParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("matricula", matricula)
    .set("nome", nome)
    const url = this.API + "/atendimento/somar?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }


  listarAtendente(unidade){
    return this.http.get<Atendente[]>(`${this.API}/atendente/${unidade}`).pipe(
      take(1)
    );
  }

}
