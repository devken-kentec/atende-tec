import { Router } from '@angular/router';
import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  loginAlteraForm: FormGroup;
  mat: string = '';
  nome: string = '';
  role: string = '';
  unidade: string = '';
  msgError: boolean = false;
  msgErrorNovaSenha: boolean = false;
  mostrarMens: boolean = false;
  confereNovaSenha: boolean = false;
  confereConfirmaNovaSenha: boolean = false;

  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      matricula: ['', []],
      senha: ['', []]
    });

    this.loginAlteraForm = this.fb.group({
      matricula: ['', []],
      senha: ['', []],
      novaSenha: ['', []],
      confirmarNovaSenha: ['', []]
    });
  }

  fechar(){
    this.msgError = false;
  }

  logar(){
    let matricula = this.loginForm.get('matricula').value;
    let senha = this.loginForm.get('senha').value;

    this.globalService.logar(matricula, senha).subscribe((dados: any)=>{

      if(matricula === dados.servidor.matricula && senha === dados.senha ){
        this.globalService.setLoggedIn(true);
        this.router.navigate(['/']);
        this.globalService.pegarDados(dados.servidor.nome, dados.role.descricao, dados.servidor.matricula, dados.unidade.descricao);
        this.globalService.setMatricula(dados.servidor.matricula),
        this.globalService.setNome(dados.servidor.nome),
        this.globalService.setRole(dados.role.descricao),
        this.globalService.setUnidadeId(dados.unidade.id),
        this.globalService.setUnidade(dados.unidade.descricao),
        this.globalService.getMatricula(),
        this.globalService.getNome(),
        this.globalService.getRole(),
        this.globalService.getUnidadeId(),
        this.globalService.getUnidade()

        }
    }, (error: any) => { this.msgError = true });
  }

  validarNovaSenha(){
      let novaSenha = this.loginAlteraForm.get('novaSenha').value;
      if(novaSenha != ""){
        this.confereNovaSenha = true;
    } else {
      this.confereNovaSenha = false;
    }
  }

  validarConfereNovaSenha(){

    let novaSenha = this.loginAlteraForm.get('novaSenha').value;
    let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

    if(novaSenha === confirmarNovaSenha){
      this.confereConfirmaNovaSenha = true;
    }

    if (confirmarNovaSenha === ""){
      this.confereConfirmaNovaSenha = false;
    }
  }

  validarDiferenca(){

    let novaSenha = this.loginAlteraForm.get('novaSenha').value;
    let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

    if(novaSenha == "" || novaSenha != confirmarNovaSenha){
      this.confereConfirmaNovaSenha = false;
    }
  }

  alterarSenha(){
    if(this.loginAlteraForm.valid){
      let matricula = this.loginAlteraForm.get('matricula').value;
      let senha = this.loginAlteraForm.get('senha').value;
      let novaSenha = this.loginAlteraForm.get('novaSenha').value;
      let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

      this.globalService.alterarSenha(matricula, senha, novaSenha, confirmarNovaSenha).subscribe(
        (success: any )=> { this.globalService.saveShow("Alterada com Sucesso!", "Senha"),
                            this.confereNovaSenha = false,
                            this.confereConfirmaNovaSenha = false
                          },
                          (error: any) => { this.msgErrorNovaSenha = true }
      );
    }
    this.loginAlteraForm.reset();
  }
}

