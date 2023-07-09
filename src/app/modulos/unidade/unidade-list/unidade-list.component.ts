import { UnidadePaginada } from './../shared/unidade-paginada';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from './../../shared/global.service';
import { UnidadeService } from './../shared/unidade.service';
import { Unidade } from './../shared/unidade';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styleUrls: ['./unidade-list.component.css'],
  preserveWhitespaces: true
})
export class UnidadeListComponent implements OnInit {

  unidades: Unidade[];
  _id: string =  "";
  _descricao: string = "";
  mostrarMens: boolean = false;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private unidadeService: UnidadeService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.listarUnidadePaginada(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  listUnidade(){
    this.unidadeService.listUnidade().subscribe(
      dados => this.unidades = dados
    );
  }

  listarUnidadePaginada(page, size){
    this.unidadeService.listUnidadePaginada(page, size).subscribe(
          response => { this.unidades = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegaDados(id, descricao){
      this._id = id,
      this._descricao = descricao;
  }

  onDelete(){
    this.unidadeService.remove(this._id).subscribe(
      success => { this.globalService.removeShow('Excluido com Sucesso!', 'Unidade'), this.listUnidade() }
    )
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarUnidadePaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarUnidadePaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarUnidadePaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }
}
