import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guiche } from '../shared/guiche';
import { GuicheService } from '../shared/guiche.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-guiche-list',
  templateUrl: './guiche-list.component.html',
  styleUrls: ['./guiche-list.component.css'],
  preserveWhitespaces: true
})
export class GuicheListComponent implements OnInit {

  guiches: Guiche[];
  mostrarMens: boolean = false;
  _id: string = "";
  _descricao: string = "";
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;


  constructor(private guicheService: GuicheService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarGuichePaginado(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  listarGuiche(){
    this.guicheService.listGuiche().subscribe(
      dados => this.guiches = dados
    );
  }

  listarGuichePaginado(page, size){
    this.guicheService.listGuicheServicoPaginado(page, size).subscribe(
          response => { this.guiches = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(){
    this.guicheService.remove(this._id).subscribe(
      success => {this.globalService.removeShow('Excluido com Sucesso!', 'Guichê'), this.listarGuiche()}
    );
  }

  pegaDados(id, descricao){
    this._id = id;
    this._descricao = descricao;
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarGuichePaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarGuichePaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarGuichePaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

}
