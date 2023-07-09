import { Router } from '@angular/router';
import { GlobalService } from './modulos/shared/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ATENDETEC';
  mat: string = '';
  nome: string = '';
  role: string = '';
  unidade: string = '';
  mostrarMenu: boolean = false;
  btnRedimensionar: boolean = false;
  telaAmpliada: boolean = false;
  visGrade: boolean = false;
  libGrade: boolean = false;
  visRecep: boolean = false;
  visAtend: boolean = false;
  visCont: boolean = false;
  visConf: boolean = false;
  visRel: boolean = false;
  visPan: boolean = false;
  visUp: boolean = false;
  p01: boolean = false;
  p02: boolean = false;
  p03: boolean = false;
  p04: boolean = false;
  p05: boolean = false;
  p06: boolean = false;
  vco: boolean = false;
  vcu: boolean = false;
  vcs: boolean = false;
  vcds: boolean = false;
  vcg: boolean = false;
  vcc: boolean = false;
  vcic: boolean = false;
  vca: boolean = false;
  vcsr: boolean = false;
  vcpa: boolean = false;
  vcm: boolean = false;

  constructor(private globalService: GlobalService,
              private router: Router){}

  ngOnInit(): void {

    this.globalService.mostrarMenuEmitter.subscribe(
      mostrar => { this.mostrarMenu = mostrar }
    );

    this.globalService.gUser.subscribe(
      user => { this.nome = user }
    );

    this.globalService.gMatricula.subscribe(
      matricula => { this.mat = matricula }
    );

    this.globalService.gUnidade.subscribe(
      unidade => { this.unidade = unidade }
    );

    this.globalService.gTipo.subscribe(
      tipo => { this.role = tipo

        if(tipo === "Administrador"){
          this.visGrade = true;
              this.libGrade = true;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  true;
              this.vco = true;
              this.vcu = true;
              this.vcs = true;
              this.vcds = true;
              this.vcg = true;
              this.vcc = true;
              this.vcic = true;
              this.vca = true;
              this.vcsr = true;
              this.vcpa = true;
              this.vcm = true;
          this.visRel = true;
          this.visPan = true;
          this.visUp = true;
          this.p01 = true;
          this.p02 = true;
          this.p03 = true;
          this.p04 = true;
          this.p05 = true;
          this.p06 = true;
          this.btnRedimensionar = true;
        } else if(tipo === "Operador"){
          this.visGrade = true;
              this.libGrade = true;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = true;
          this.visConf =  true;
              this.vco = true;
              this.vcu = true;
              this.vcs = true;
              this.vcds = true;
              this.vcg = true;
              this.vcc = true;
              this.vcic = true;
              this.vca = true;
              this.vcsr = true;
              this.vcpa = true;
              this.vcm = true;
          this.visUp = true;
          this.visRel = true;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Coordenação"){
          this.visGrade = true;
              this.libGrade = true;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  true;
              this.vco = false;
              this.vcu = false;
              this.vcs = false;
              this.vcds = false;
              this.vcg = false;
              this.vcc = false;
              this.vcic = false;
              this.vca = true;
              this.vcsr = true;
              this.vcpa = true;
              this.vcm = false;
          this.visRel = true;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Supervisão"){
          this.visGrade = true;
              this.libGrade = true;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  true;
              this.vco = false;
              this.vcu = false;
              this.vcs = false;
              this.vcds = false;
              this.vcg = false;
              this.vcc = false;
              this.vcic = false;
              this.vca = true;
              this.vcsr = true;
              this.vcpa = true;
              this.vcm = false;
          this.visRel = true;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Apoio Administrativo"){
          this.visGrade = false;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  false;
          this.visRel = true;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Apoio de Informática"){
          this.visGrade = true;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  true;
                this.vco = false;
                this.vcu = false;
                this.vcs = false;
                this.vcds = false;
                this.vcg = false;
                this.vcc = false;
                this.vcic = false;
                this.vca = true;
                this.vcsr = true;
                this.vcpa = true;
                this.vcm = false;
          this.visRel = true;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Recepção/Informação"){
          this.visGrade = false;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if(tipo === "Atendente"){
          this.visGrade = false;
          this.visRecep = true;
          this.visAtend = true;
          this.visCont = true;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = false;
          this.btnRedimensionar = true;
        } else if (tipo === "Painel01"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p01 = true;
          this.btnRedimensionar = true;
        } else if (tipo === "Painel02"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p02 = true;
          this.btnRedimensionar = true;
        } else if (tipo === "Painel03"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p03 = true;
          this.btnRedimensionar = true;
        } else if (tipo === "Painel04"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p04 = true;
          this.btnRedimensionar = true
        } else if (tipo === "Painel05"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p05 = true;
          this.btnRedimensionar = true;
        } else if (tipo === "Painel06"){
          this.visGrade = false;
          this.visRecep = false;
          this.visAtend = false;
          this.visCont = false;
          this.visConf =  false;
          this.visRel = false;
          this.visPan = true;
          this.p06 = true;
          this.btnRedimensionar = true;
        }
      }
    );
    this.router.navigate(['/login']);
  }

  ampliarTela(){
    this.mostrarMenu = !this.mostrarMenu;
    this.telaAmpliada = !this.telaAmpliada;
  }
}
