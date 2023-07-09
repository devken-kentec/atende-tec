import { FormGroup, FormBuilder } from '@angular/forms';
import { DetalhamentoServicoService } from './../shared/detalhamento-servico.service';
import { DetalhamentoServico } from './../shared/detalhamento-servico';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhamento-servico-list',
  templateUrl: './detalhamento-servico-list.component.html',
  styleUrls: ['./detalhamento-servico-list.component.css'],
  preserveWhitespaces: true
})
export class DetalhamentoServicoListComponent implements OnInit {

  mostrarMens: boolean = false;
  _id: string = "";
  _descricao: string = "";
  detalhamentoServicos: DetalhamentoServico[];
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;

  constructor(private detalhamentoServicoService: DetalhamentoServicoService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarDetalhamentoServicoPaginado(this.pagina, this.tamanho);

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });

  }

  listDetalhamentoServico(){
    this.detalhamentoServicoService.listDetalhamentoServico().subscribe(
      dados=> this.detalhamentoServicos = dados
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegarDados(id, descricao){
    this._id = id;
    this._descricao = descricao;
  }

  onDelete(){

  }

  listarDetalhamentoServicoPaginado(page, size){
    this.detalhamentoServicoService.listDetalhamentoServicoPaginado(page, size).subscribe(
          response => { this.detalhamentoServicos = response.content;
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
     return this.listarDetalhamentoServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarDetalhamentoServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarDetalhamentoServicoPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

}
