import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgaoService } from './../shared/orgao.service';
import { Component, OnInit } from '@angular/core';
import { Orgao } from '../shared/orgao';

@Component({
  selector: 'app-orgao-list',
  templateUrl: './orgao-list.component.html',
  styleUrls: ['./orgao-list.component.css'],
  preserveWhitespaces: true
})
export class OrgaoListComponent implements OnInit {

  orgaos: Orgao[];
  _id: string = "";
  _descricao: string = "";
  mostrarMens: boolean = false;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private orgaoService: OrgaoService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarOrgaoPaginada(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  listOrgao(){
    this.orgaoService.listOrgao().subscribe(
      dados => this.orgaos = dados
    );
  }

  listarOrgaoPaginada(page, size){
    this.orgaoService.listOrgaoPaginada(page, size).subscribe(
          response => { this.orgaos = response.content,
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarOrgaoPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarOrgaoPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarOrgaoPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegaDados(id, descricao){
      this._id = id;
      this._descricao = descricao;
  }

  onDelete(){
    this.orgaoService.remove(this._id).subscribe(
      success=>{this.globalService.removeShow('Excluido com Sucesso!', 'Orgão'), this.listOrgao()}
    );
  }


}
