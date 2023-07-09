import { tap, take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

 private matricula: string;
 private nome: string;
 private role: string;
 private unidade: string;
 private unidadeId: number;

  private readonly API = `${environment.API}/atendeTec/api`;

  private loggedInStatus: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();
  gUser = new EventEmitter<string>();
  gTipo = new EventEmitter<string>();
  gMatricula = new EventEmitter<string>();
  gUnidade = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
    this.mostrarMenuEmitter.emit(true);
  }

  pegarDados(user: string, tipo: string, matricula: string, unidade: string ){
    this.gUser.emit(user);
    this.gTipo.emit(tipo);
    this.gMatricula.emit(matricula);
    this.gUnidade.emit(unidade);
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }

  logar(matricula, senha){

    const httpParams =new HttpParams()
    .set("matricula", matricula)
    .set("senha", senha);

    const url = this.API+ "/acesso/logar?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  alterarSenha(matricula, senha, novaSenha, confirmarNovaSenha){

    const httpParams =new HttpParams()
    .set("matricula", matricula)
    .set("senha", senha)
    .set("novaSenha", novaSenha)
    .set("confirmarNovaSenha", confirmarNovaSenha);

    const url = this.API+ "/acesso/alterarSenha?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  //GETTER END SETTER
  setMatricula(matricula: string) {
    this.matricula = matricula;
   }

   getMatricula(): string {
     return this.matricula;
   }

   setNome(nome: string){
     this.nome = nome;
   }

   getNome(){
     return this.nome;
   }

   setRole(role: string){
      this.role = role;
   }

   getRole(){
     return this.role;
   }

   setUnidadeId(unidadeId: number){
    this.unidadeId = unidadeId;
   }

   getUnidadeId(){
    return this.unidadeId;
  }

   setUnidade(unidade: string){
      this.unidade = unidade;
   }

   getUnidade(){
     return this.unidade;
   }

   //UTILITARIOS
  formatarDate(data: string){
    let dataCompleta = "";
			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);

       if(dia.length == 1){
        dia = "0" + dia;
     }
      if(mes.length == 1){
        mes = "0" + mes
      }
     dataCompleta = dia+"/"+mes+"/"+ano
		 return dataCompleta;
  }

  formatarTime(time: string){
    let horaCompleta = "";
    let hora = time.substring(11,13);
    let minuto = time.substring(14, 16);

    if(hora.length == 1){
      hora = "0" + hora;
    }

    if(minuto.length == 1){
      minuto = "0" + minuto;
    }
    horaCompleta = hora + ":" + minuto;
    return horaCompleta;
  }

  formatarPessoas(pfj: string){
    let res: string;
    if(pfj.length == 11 ){
      res = this.formatarCpf(pfj);
    }

    if(pfj.length == 14 ){
      res = this.formatarCnpj(pfj);
    }
    return res;
  }

  formatarCpf(cpf){
    let str:string = cpf;
    let p1 = str.substring(0, 3);
    let p2 = str.substring(3, 6);
    let p3 = str.substring(6, 9);
    let p4 = str.substring(9, 11);
      cpf = p1 + "." + p2 + "." + p3 + "-" + p4;
    return cpf
   }

   formatarCnpj(cnpj){
     let str: string = cnpj;

     let p1 = str.substring(0, 2);
     let p2 = str.substring(2, 5);
     let p3 = str.substring(5, 8);
     let p4 = str.substring(8, 12);
     let p5 = str.substring(12, 14);
      cnpj = p1 + "." + p2 + "." + p3 + "/" + p4 + "-" + p5;
      return cnpj;
    }

    formatarData(data: string) {
      let dataCompleta = "";
      if(data != null) {
         let dia = data.substring(0,2);
         let mes = data.substring(2,4);
         let ano = data.substring(4,8);
         dataCompleta = dia+"/"+mes+"/"+ano
      }
      if(dataCompleta == "//"){
        dataCompleta = ""
      }
       return dataCompleta;
    }

    saveShow(mensagem: string, titulo: string){
      this.toastr.success(mensagem, titulo);
    }

    removeShow(mensagem: string, titulo: string){
      this.toastr.error(mensagem, titulo);
    }

    alertShow(mensagem: string, titulo: string){
      this.toastr.warning(mensagem, titulo)
    }

    infoShow(mensagem: string, titulo: string){
      this.toastr.info(mensagem, titulo);
    }

}
