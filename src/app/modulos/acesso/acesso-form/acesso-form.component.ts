import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { ServidorService } from './../../servidor/shared/servidor.service';
import { Role } from './../shared/role';
import { AcessoService } from './../shared/acesso.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { Unidade } from './../../unidade/shared/unidade';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Servidor } from '../../servidor/shared/servidor';

@Component({
  selector: 'app-acesso-form',
  templateUrl: './acesso-form.component.html',
  styleUrls: ['./acesso-form.component.css'],
  preserveWhitespaces: true
})
export class AcessoFormComponent implements OnInit {

  mostrarMens: boolean = false;
  acessoForm: FormGroup;
  servidores: Servidor[];
  unidades: Unidade[];
  roles: Role[];
  matricula: string;
  servidor: string;
  unidade: string;
  role: string;
  senha: string;

  constructor(private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private acessoService: AcessoService,
              private servidorService: ServidorService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.comboBox();

    const routeParams = this.route.snapshot.params;

    if(routeParams.id != null){
      this.acessoService.loadById(routeParams.id).subscribe((acesso: any)=>{
        this.updateAcessoForm(acesso)
      });
    }

    this.acessoForm = this.fb.group({

      id: [null, []],
      servidor: this.fb.group({
        matricula: ['', []]
      }),
      unidade: this.fb.group({
        id: ['', []]
      }),
      role: this.fb.group({
        id: ['', []]
      }),
      senha: ['', []]
    });
  }

  updateAcessoForm(acesso){
    this.acessoForm.patchValue(acesso);
  }

  comboBox(){
      this.unidadeService.listUnidade().subscribe(
        dados => this.unidades = dados
      );

      this.acessoService.listRole().subscribe(
        dados => this.roles = dados
      );

      this.servidorService.listServidor().subscribe(
        dados=> this.servidores = dados
      );
  }

  onUpdatePass(){
    this.acessoForm.get('senha').setValue('semad2021');
    this.onSubmit();
  }

  onSubmit(){
    if(this.acessoForm.valid){
       this.acessoService.save(this.acessoForm.value).subscribe(
          success => { this.globalService.saveShow("Realizado com Sucesso", "Acesso") }
        );
      }
    this.acessoForm.reset();
  }
}
