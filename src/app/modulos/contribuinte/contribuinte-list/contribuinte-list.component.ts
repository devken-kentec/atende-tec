import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContribuinteService } from './../shared/contribuinte.service';
import { Contribuinte } from './../shared/contribuinte';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contribuinte-list',
  templateUrl: './contribuinte-list.component.html',
  styleUrls: ['./contribuinte-list.component.css'],
  preserveWhitespaces: true
})
export class ContribuinteListComponent implements OnInit {

  contribuintes: Contribuinte[];
  mostrarMens: boolean = false;
  contribuinteForm: FormGroup;
  _id: string;
  _descricao: string;
  constructor(private contribuinteService: ContribuinteService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              protected globalService: GlobalService) { }

  ngOnInit(): void {
    this.contribuinteForm = this.fb.group({
        nome: ['',[]],
        cpfCnpj: ['', []]
    });
  }

  listContribuinte(){
    this.contribuinteService.listContribuinte().subscribe(
      dados => this.contribuintes = dados
    );
  }

  onEdit(id){
   this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(){

  }

  pegarDados(id, descricao){
      this._id = id;
      this._descricao = descricao;
  }

  pesquisar(){
    let nome = this.contribuinteForm.get('nome').value;
    let cpfCnpj = this.contribuinteForm.get('cpfCnpj').value;

    this.contribuinteService.buscaAvancada(nome, cpfCnpj).subscribe(
      dados=>this.contribuintes = dados
    );
  }
}

