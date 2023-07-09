import { UnidadePaginada } from './unidade-paginada';
import { Unidade } from './unidade';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private readonly API = `${environment.API}/atendeTec/api/unidade`;

  constructor(private http: HttpClient) { }

  listUnidade(){
    return this.http.get<Unidade[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  listUnidadeGenerica(role, unidadeId){

    const httpParams = new HttpParams()
    .set("role", role)
    .set("unidadeId", unidadeId)

    const url = this.API + "/unidadeGenerica?" + httpParams;

    return this.http.get<Unidade[]>(url).pipe(
      take(1)
    );
  }

  listUnidadePaginada(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<UnidadePaginada>(`${this.API}/unidadePage?${params.toString()}`).pipe(
      take(1)
    );
  }

  loadById(id){
      return this.http.get(`${this.API}/${id}`).pipe(
        take(1)
      );
  }

  private create(unidade){
      return this.http.post(`${this.API}`, unidade).pipe(
        take(1)
      )
  }

  private update(unidade){
    return this.http.put(`${this.API}/${unidade.id}`, unidade).pipe(
      take(1)
    )
  }

  save(unidade){
      if(unidade.id){
          return this.update(unidade);
      } else {
          return this.create(unidade);
      }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1)
    )
  }
}
