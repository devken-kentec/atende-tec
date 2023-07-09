import { AgendaPaginada } from './agenda-paginada';
import { Agendamento } from './agendamento';
import { tap, take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly API = `${environment.API}/atendeTec/api/agendamento`;

  constructor(private http: HttpClient) { }

  listAgenda(){
    return this.http.get<Agendamento[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/busca/${id}`).pipe(
      take(1)
    );
  }

  encaixeTecnico(id, cpfCnpj){
    return this.http.get(`${this.API}/encaixeTecnico/${id}/${cpfCnpj}`).pipe(
      take(1)
    );
  }

  buscaAvancada(unidade, dataInicial, dataFinal, servico, statusAgendamento){
    const httpParams = new HttpParams()
    .set("unidade", unidade)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("servico", servico)
    .set("statusAgendamento", statusAgendamento)
    const url = this.API + "/buscar" + "?" + httpParams;
    return this.http.get<Agendamento[]>(url).pipe(
      take(1)
    );
}

  listAgendaPaginada(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<AgendaPaginada>(`${this.API}/agendaPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  excluirAgendamento(gradeId){
    return this.http.get(`${this.API}/exclusaoAgendamento/${gradeId}`).pipe(
        take(1)
    );
  }

  create(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }
}
