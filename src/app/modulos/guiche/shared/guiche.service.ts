
import { Guiche } from './guiche';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { GuichePaginado } from './guiche-paginado';


@Injectable({
  providedIn: 'root'
})
export class GuicheService {

  private readonly API = `${environment.API}/atendeTec/api/guiche`;

  constructor(private http: HttpClient) { }

  listGuiche(){
    return this.http.get<Guiche[]>(`${this.API}`).pipe(
     take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  listGuicheServicoPaginado(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<GuichePaginado>(`${this.API}/guichePage?${params.toString()}`).pipe(
      take(1)
    );
  }

  private create(guiche){
      return this.http.post(`${this.API}`, guiche).pipe(
          take(1)
      );
  }

  private update(guiche){
    return this.http.put(`${this.API}/${guiche.id}`, guiche).pipe(
      take(1)
    );
  }

  save(guiche){
      if(guiche.id){
          return this.update(guiche);
      } else {
          return this.create(guiche);
      }
  }

  remove(id){
      return this.http.delete(`${this.API}/${id}`).pipe(
        take(1)
      );
  }

}
