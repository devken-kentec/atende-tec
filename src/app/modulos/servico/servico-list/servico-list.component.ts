import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from './../../shared/global.service';
import { ServicoService } from './../shared/servico.service';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../shared/servico';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css'],
  preserveWhitespaces: true
})
export class ServicoListComponent implements OnInit {

  servicos: Servico[];
  _id: string = "";
  _descricao: string = "";
  mostrarMens: boolean = false;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private servicoService: ServicoService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarServicoPaginado(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  listarServico(){
    this.servicoService.listServico().subscribe(
          dados => this.servicos = dados
        );
  }

  listarServicoPaginado(page, size){
    this.servicoService.listServicoPaginado(page, size).subscribe(
          response => { this.servicos = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegaDados(id, descricao){
    this._id = id;
    this._descricao = descricao;
  }

  onDelete(){
    this.servicoService.remove(this._id).subscribe(
      sucess=> { this.globalService.removeShow('Excluido com Sucesso!', 'Serviço')}
    );
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }
}
