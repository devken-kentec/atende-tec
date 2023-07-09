import { take, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contribuinte } from './contribuinte';

@Injectable({
  providedIn: 'root'
})
export class ContribuinteService {

 private readonly API = `${environment.API}/atendeTec/api/contribuinte`;

  constructor(private http: HttpClient) { }

  listContribuinte(){
    return this.http.get<Contribuinte[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  private create(contribuinte){
    return this.http.post(`${this.API}`, contribuinte).pipe(
      take(1)
    );
  }

  private update(contribuinte){
    return this.http.put(`${this.API}/${contribuinte.id}`, contribuinte).pipe(
        take(1)
    );
  }


  buscaAvancada(nome, cpfCnpj){

    const httpParams =new HttpParams()
    .set("nome", nome)
    .set("cpfCnpj", cpfCnpj);
    const url = this.API+ "/buscar?" + httpParams;

  return this.http.get<Contribuinte[]>(url).pipe(
    take(1)
  );
  }

  save(contribuinte){
      if(contribuinte.id != null){
        return this.update(contribuinte);
      } else {
        return this.create(contribuinte);
      }
  }

}
