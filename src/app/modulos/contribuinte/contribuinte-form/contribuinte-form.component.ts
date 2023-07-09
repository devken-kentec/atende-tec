import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { ContribuinteService } from './../shared/contribuinte.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contribuinte-form',
  templateUrl: './contribuinte-form.component.html',
  styleUrls: ['./contribuinte-form.component.css'],
  preserveWhitespaces: true
})
export class ContribuinteFormComponent implements OnInit {

  contribuinteForm: FormGroup;
  id: number;
  nome: string;
  cpfCnpj: string;
  email: string;
  fone: string;
  senha: string;
  mostrarSenha: boolean = false;

  constructor(private contribuinteService: ContribuinteService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;

    if(routeParans.id != null){
        this.contribuinteService.loadById(routeParans.id).subscribe((contribuinte: any)=> {
              this.updateContribuinteForm(contribuinte), this.mostrarSenha = true
        });
    }

    this.contribuinteForm = this.fb.group({
        id: [null, []],
        nome: ['', []],
        cpfCnpj: ['', []],
        email: ['', []],
        fone: ['', []],
        senha: ['', []]
    })
  }

  updateContribuinteForm(contribuinte){
    this.contribuinteForm.patchValue(contribuinte);
  }

  confirmar(){

    this.mostrarSenha = true;
    this.id = this.contribuinteForm.get('id').value;
    this.nome = this.contribuinteForm.get('nome').value;
    this.cpfCnpj = this.globalService.formatarPessoas(this.contribuinteForm.get('cpfCnpj').value);
    this.email = this.contribuinteForm.get('email').value;
    this.fone = this.contribuinteForm.get('fone').value;
    if(this.id == null){
      this.contribuinteForm.get('senha').setValue(this.gerarSenha())
    }
    this.senha = this.contribuinteForm.get('senha').value;
  }

    gerarSenha(){

      let senha: string;

      if(this.id == null){

        let nom: string = this.contribuinteForm.get('nome').value;
        let p1 =nom.substring(0, 3).toLocaleLowerCase();

        let cp: string = this.contribuinteForm.get('cpfCnpj').value;
        let p2 = cp.substring(0, 3);

        senha = p1 + p2;
      }
      return senha
    }

    onSumit(){
      if(this.contribuinteForm.valid){
        this.contribuinteService.save(this.contribuinteForm.value).subscribe(
            success => { this.globalService.saveShow("Salvo com Sucesso!", "Usuário") }
        )
      }
      this.contribuinteForm.reset();
    }

    onUpdatePass(){
      this.contribuinteForm.get('senha').setValue(this.gerarSenha());
      this.onSumit();
    }

}
