import { PerfilAtendimento } from './perfil-atendimento';
import { tap, take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilAtendimentoService {


  private readonly API = `${environment.API}/atendeTec/api/perfilatendimento`;

  constructor(private http: HttpClient) { }


  loadById(matricula){
     return this.http.get<PerfilAtendimento[]>(`${this.API}/${matricula}`).pipe(
        take(1)
      );
  }

  createPerfil(matricula, servico){

    const httpParams = new HttpParams()
    .set("matricula", matricula)
    .set("servico", servico);

    const url = this.API + "/gerarPerfil?" + httpParams;

    return this.http.get(url).pipe(
      take(1)
    );
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

}
