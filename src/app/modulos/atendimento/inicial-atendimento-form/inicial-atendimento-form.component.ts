import { GuicheService } from './../../guiche/shared/guiche.service';
import { Guiche } from './../../guiche/shared/guiche';
import { GlobalService } from './../../shared/global.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtendimentoService } from '../shared/atendimento.service';

@Component({
  selector: 'app-inicial-atendimento-form',
  templateUrl: './inicial-atendimento-form.component.html',
  styleUrls: ['./inicial-atendimento-form.component.css']
})
export class InicialAtendimentoFormComponent implements OnInit {

  getNome: string;
  getMatricula: string;
  inicialAtendForm: FormGroup;
  guiches: Guiche[];

  constructor(private globalService: GlobalService,
              private fb: FormBuilder,
              private atendimentoService: AtendimentoService,
              private router: Router,
              private guicheService: GuicheService ) { }

  ngOnInit(): void {

    this.getNome = this.globalService.getNome();
    this.getMatricula = this.globalService.getMatricula();

    this.findByGuicheAll();

    this.inicialAtendForm = this.fb.group({
      matricula: ['', []],
      statusAtendimento: ['', [Validators.required]],
      guiche: ['', [Validators.required]]
    });

    this.inicialAtendForm.get('matricula').setValue(this.getMatricula);
  }

  findByGuicheAll(){
    this.guicheService.listGuiche().subscribe(
      dados => this.guiches = dados
    );
  }

  onSubmit(){
    if(this.inicialAtendForm.valid){
      let nome = this.getNome;
      let mat = this.inicialAtendForm.get('matricula').value;
      let sta = this.inicialAtendForm.get('statusAtendimento').value;
      let gui = this.inicialAtendForm.get('guiche').value;

      this.atendimentoService.createAtendente(mat, sta, gui).subscribe(
        success => { this.globalService.saveShow(sta, gui) , this.router.navigate(['atendimento/listaAtendimento', nome, sta])},
        error => { this.globalService.alertShow("Alguma coisa está faltando", "Ops!") }
      );
    }
  }
}
