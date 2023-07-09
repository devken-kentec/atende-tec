import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Painel } from './painel';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  private readonly API = `${environment.API}/atendeTec/api/painel`;

  constructor(private http: HttpClient) { }

  findByPainelA(){
    return this.http.get<Painel[]>(`${this.API}/01`).pipe(
      take(1)
    );
  }

  findByChamada(){
    return this.http.get(`${this.API}/01/chamada`).pipe(
      take(1)
    );
  }

  findByPainelB(){
    return this.http.get<Painel[]>(`${this.API}/02`).pipe(
      take(1)
    );
  }

  findByChamadaB(){
    return this.http.get(`${this.API}/02/chamada`).pipe(
      take(1)
    );
  }

  findByPainelC(){
    return this.http.get<Painel[]>(`${this.API}/03`).pipe(
      take(1)
    );
  }

  findByChamadaC(){
    return this.http.get(`${this.API}/03/chamada`).pipe(
      take(1)
    );
  }

  findByPainelD(){
    return this.http.get<Painel[]>(`${this.API}/04`).pipe(
      take(1)
    );
  }

  findByChamadaD(){
    return this.http.get(`${this.API}/04/chamada`).pipe(
      take(1)
    );
  }

  findByPainelE(){
    return this.http.get<Painel[]>(`${this.API}/05`).pipe(
      take(1)
    );
  }

  findByChamadaE(){
    return this.http.get(`${this.API}/05/chamada`).pipe(
      take(1)
    );
  }

  findByPainelF(){
    return this.http.get<Painel[]>(`${this.API}/06`).pipe(
      take(1)
    );
  }

  findByChamadaF(){
    return this.http.get(`${this.API}/06/chamada`).pipe(
      take(1)
    );
  }

}
