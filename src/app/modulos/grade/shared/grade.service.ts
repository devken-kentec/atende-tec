import { Grade } from './grade';
import { take, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private readonly API = `${environment.API}/atendeTec/api/grade`;

  constructor(private http: HttpClient) { }

  listGrade(){
    return this.http.get<Grade[]>(`${this.API}`).pipe(
      take(1)
    )
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  buscaAvancada(unidade, dataInicial, dataFinal, servico){

       const httParams = new HttpParams()
       .set("unidade", unidade)
       .set("dataInicial", dataInicial)
       .set("dataFinal", dataFinal)
       .set("servico", servico);
       const url = this.API + "/buscar?" + httParams;

       return this.http.get<Grade[]>(url).pipe(
         take(1)
       );
  }

  private create(grade){
    return this.http.post(`${this.API}`, grade).pipe(
      take(1)
    )
  }

  private update(grade){
    return this.http.put(`${this.API}/${grade.id}`, grade).pipe(
      take(1)
    )
  }

  save(grade){
    if(grade.id != null){
      return this.update(grade);
    } else {
      return this.create(grade);
    }
  }

  saveGradeMultipla(grade){
    return this.http.post(`${this.API}/multipla`, grade).pipe(
      take(1)
    );
  }

  liberarGrade(id){
    return this.http.get(`${this.API}/liberarGrade/${id}`).pipe(
      take(1)
    )
  }
}
