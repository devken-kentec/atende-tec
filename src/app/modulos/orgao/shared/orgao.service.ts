import { OrgaoPaginada } from './orgao-paginada';
import { tap, take } from 'rxjs/operators';
import { Orgao } from './orgao';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {

  private readonly API = `${environment.API}/atendeTec/api/orgao`;

  constructor(private http: HttpClient) { }

  listOrgao(){
    return this.http.get<Orgao[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  listOrgaoPaginada(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<OrgaoPaginada>(`${this.API}/orgaoPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  private create(orgao){
    return this.http.post(`${this.API}`, orgao).pipe(
      take(1)
    );
  }

  private update(orgao){
    return this.http.put(`${this.API}/${orgao.id}`, orgao).pipe(
      take(1)
    );
  }

  save(orgao){
    if(orgao.id){
      return this.update(orgao);
    } else {
      return this.create(orgao);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1)
    );
  }
}
