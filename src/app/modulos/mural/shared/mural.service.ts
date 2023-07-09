import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  private readonly API = `${environment.API}/atendeTec/api/mural`;

  constructor(private http: HttpClient) { }

  findByAll(){
    return this.http.get(`${this.API}`).pipe(
      take(1)
    );
  }

  findById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  private create(mural){
    return this.http.post(`${this.API}`, mural).pipe(
      take(1)
    );
  }

  private update(mural){
    return this.http.put(`${this.API}`, mural).pipe(
      take(1)
    );
  }

  save(mural){
    if(mural.id){
       return this.update(mural);
    } else {
      return this.create(mural);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

}
