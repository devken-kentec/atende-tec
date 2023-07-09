import { delay, take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly API = `${environment.API}/atendeTec/api/uploads`;

  constructor(private http: HttpClient) { }

  uploadCalendario(calendario){
    return this.http.post(`${this.API}/calendario`, calendario).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadGrade(grade){
    return this.http.post(`${this.API}/grade`, grade).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadServico(servico){
    return this.http.post(`${this.API}/servico`, servico).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadDetalheServico(detalheServico){
    return this.http.post(`${this.API}/detalheServico`, detalheServico).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadUnidade(unidade){
    return this.http.post(`${this.API}/unidade`, unidade).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadOrgao(orgao){
    return this.http.post(`${this.API}/orgao`, orgao).pipe(
      delay(3000),
      take(1)
    );
  }

  uploadServidor(servidor){
    return this.http.post(`${this.API}/servidor`, servidor).pipe(
      delay(3000),
      take(1)
    );
  }
}
