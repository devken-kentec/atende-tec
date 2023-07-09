import { Fila } from './../../ativacao/shared/fila';
import { take, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private readonly API = `${environment.API}/atendeTec/api`;

  constructor(private http: HttpClient) { }

  createAtendente(matricula, statusAtendimento, guiche){

    const httpParams = new HttpParams()
    .set("matricula", matricula)
    .set("statusAtendimento", statusAtendimento)
    .set("guiche", guiche);

    const url = this.API + "/atendimento/gerarAtendente?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  createChamar(fila, servidor){

      const httpParams = new HttpParams()
      .set("fila", fila)
      .set("servidor", servidor);

      const url = this.API + "/atendimento/chamar?" + httpParams;
      return this.http.get(url).pipe(
        take(1)
      );
  }

  createReagendar(fila, servico){

    const httpParams = new HttpParams()
    .set("fila", fila)
    .set("servico", servico);

    const url = this.API + "/atendimento/reagendar?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
}

  createComecar(fila){

    const httpParams = new HttpParams()
      .set("fila", fila);

      const url = this.API + "/atendimento/comecar?" + httpParams;
      return this.http.get(url).pipe(
        take(1)
      );
  }

  createFinalizar(fila){
    const httpParams = new HttpParams()
    .set("fila", fila);

    const url = this.API + "/atendimento/finalizar?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  loadByMatricula(matricula){
    return this.http.get(`${this.API}/atendimento/${matricula}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/fila/${id}`).pipe(
      take(1)
    );
  }

  listarFilaEspera(matricula, unidade){
    return this.http.get<Fila[]>(`${this.API}/fila/espera/${matricula}/${unidade}`).pipe(
      take(1)
    );
  }

  createAtendimento(atendimento){
    return this.http.post(`${this.API}/atendimento`, atendimento).pipe(
      take(1)
    );
  }
}
