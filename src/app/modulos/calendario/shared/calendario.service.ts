import { tap, take } from 'rxjs/operators';
import { Calendario } from './calendario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalendarioService {

  private readonly API = `${environment.API}/atendeTec/api/calendario`;

  constructor(private http: HttpClient) { }

  listCalendario(){
    return this.http.get<Calendario[]>(`${this.API}`).pipe(
        take(1)
    )
  }

  buscaAvancada(dataInicial, dataFinal, statusCalendario, observacao){
    const httpParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("statusCalendario", statusCalendario)
    .set("observacao", observacao);

    const url = this.API + "/buscar?" + httpParams;

    return this.http.get<Calendario[]>(url).pipe(
      take(1)
    );
  }

  inativarDias(dataInicial, dataFinal){

    const httpParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)

    const url = this.API + "/inativarDias?"+ httpParams;

    return this.http.get(url).pipe(
        take(1)
    );
  }

  listarDiasAtivos(){
    return this.http.get<Calendario[]>(`${this.API}/diasAtivos`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
        take(1)
    );
  }

  private create(calendario){
    return this.http.post(`${this.API}`, calendario).pipe(
      take(1)
    );
  }

  private update(calendario){
    return this.http.put(`${this.API}/${calendario.id}`, calendario).pipe(
      take(1)
    );
  }

  save(calendario){
    if(calendario.id){
      return this.update(calendario);
    } else {
      return this.create(calendario);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1)
    );
  }
}
