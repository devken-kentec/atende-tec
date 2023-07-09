import { DetalhamentoServicoPaginado } from './detalhamento-servico-paginado';
import { take } from 'rxjs/operators';
import { DetalhamentoServico } from './detalhamento-servico';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalhamentoServicoService {

  private readonly API = `${environment.API}/atendeTec/api/detalhamentoservico`;

  constructor(private http: HttpClient) { }

  listDetalhamentoServico(){
    return this.http.get<DetalhamentoServico[]>(`${this.API}`).pipe(
      take(1)
    );
  }

  listDetalhamentoServicoAtendimento(){
    return this.http.get<DetalhamentoServico[]>(`${this.API}/listar/servico/atendimento`).pipe(
      take(1)
    );
  }

  listDetalhamentoServicoPaginado(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<DetalhamentoServicoPaginado>(`${this.API}/detalhamentoServicoPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
       take(1)
    );
  }

  private create(detServico){
    return this.http.post(`${this.API}`, detServico).pipe(
        take(1)
    );
  }

  private update(detServico){
    return this.http.put(`${this.API}/${detServico.id}`, detServico).pipe(
      take(1)
    );
  }

  save(detServico){
      if(detServico){
          return this.create(detServico);
      } else {
          return this.update(detServico);
      }
  }
}
