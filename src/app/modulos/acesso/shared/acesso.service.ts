import { AcessoPaginado } from './acesso-paginado';
import { take } from 'rxjs/operators';
import { Role } from './role';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Acesso } from './acesso';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private readonly API = `${environment.API}/atendeTec/api`;

  constructor(private http: HttpClient) { }

  listRole(){
    return this.http.get<Role[]>(`${this.API}/role`).pipe(
      take(1)
    );
  }

  listAcesso(){
    return this.http.get<Acesso[]>(`${this.API}/acesso`).pipe(
      take(1)
    );
  }

  listAcessoPaginado(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<AcessoPaginado>(`${this.API}/acesso/acessoPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/acesso/${id}`).pipe(
      take(1)
    );
  }

  private create(acesso){
    return this.http.post(`${this.API}/acesso`, acesso).pipe(
      take(1)
    );
  }

  private update(acesso){
    return this.http.put(`${this.API}/acesso/${acesso.id}`, acesso).pipe(
      take(1)
    );
  }

  save(acesso){
    if(acesso.id){
      return this.update(acesso);
    } else {
      return this.create(acesso);
    }
  }
}
