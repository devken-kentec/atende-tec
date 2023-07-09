import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessoService } from './../shared/acesso.service';
import { Acesso } from './../shared/acesso';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-acesso-list',
  templateUrl: './acesso-list.component.html',
  styleUrls: ['./acesso-list.component.css'],
  preserveWhitespaces: true
})
export class AcessoListComponent implements OnInit {

  acessos: Acesso[];
  _id: string;
  _descricao: string;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private acessoService: AcessoService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarAcessoPaginado(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  listarAcesso(){
    this.acessoService.listAcesso().subscribe(
        dados => this.acessos = dados
    );
  }

  listarAcessoPaginado(page, size){
    this.acessoService.listAcessoPaginado(page, size).subscribe(
          response => { this.acessos = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegarDados(id, descricao){
      this._id = id;
      this._descricao = descricao
  }


  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarAcessoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarAcessoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarAcessoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

}
