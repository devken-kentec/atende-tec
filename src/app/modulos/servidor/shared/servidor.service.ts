import { Servidor } from './servidor';
import { take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private readonly API = `${environment.API}/atendeTec/api/servidor`;

  constructor(private http: HttpClient) { }

  listServidor(){
    return this.http.get<Servidor[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  loadByMatricula(matricula){
    return this.http.get(`${this.API}/${matricula}`).pipe(
      take(1)
    );
  }

  pesquisaAvancada(matricula, nome, cpf){

    const httpParams = new HttpParams()
    .set("matricula", matricula)
    .set("nome", nome)
    .set("cpf", cpf);

    const url = this.API + "/buscar?" +  httpParams;

    return this.http.get<Servidor[]>(url).pipe(
      take(1)
    );
  }

  create(servidor){
    return this.http.post(`${this.API}`, servidor).pipe(
      take(1)
    );
  }

  update(servidor){
    return this.http.put(`${this.API}/${servidor.matricula}`, servidor).pipe(
      take(1)
    );
  }

  remove(id){
    return this.http.get(`${this.API}/status/${id}` ).pipe(
      take(1)
    );
  }
}
