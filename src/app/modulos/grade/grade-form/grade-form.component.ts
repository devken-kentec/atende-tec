import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from './../shared/grade.service';
import { CalendarioService } from './../../calendario/shared/calendario.service';
import { UnidadeService } from './../../unidade/shared/unidade.service';
import { ServicoService } from './../../servico/shared/servico.service';
import { Calendario } from './../../calendario/shared/calendario';
import { Unidade } from './../../unidade/shared/unidade';
import { Servico } from './../../servico/shared/servico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css']
})
export class GradeFormComponent implements OnInit {

  gradeForm: FormGroup;
  mostrarMens: boolean = false
  servicos: Servico[];
  unidades: Unidade[];
  calendarios: Calendario[];
  horaTotal: any;
  minutoTotal: any;
  mediaAtenHora: any;
  totAtend: any;
  corrVaga: any;

  constructor(private fb: FormBuilder,
              private servicoService: ServicoService,
              private unidadeService: UnidadeService,
              private calendarioService: CalendarioService,
              private gradeService: GradeService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.comboBox();

    const routeParans = this.route.snapshot.params;
    if(routeParans.id != null){
      this.gradeService.loadById(routeParans.id).subscribe((grade: any)=>
        { this.updateGradeForm(grade),
          this.calcula()});
    }

    this.gradeForm = this.fb.group({
      id: [null,[]],
      calendario: this.fb.group({
        id: ['', []],
        dia: ['',[]]
      }),
      horaInicial: ['',[]],
      horaFinal: ['',[]],
      intervalo: ['',[]],
      correcaoHora: ['',[]],
      configurado: ['',[]],
      gerado: ['',[]],
      unidade: this.fb.group({
        id: ['' ,[]],
        descricao: ['',[]]
      }),
      servico: this.fb.group({
        id: ['' ,[]],
        descricao: ['',[]]
      }),
      quantidade: ['',[]]
    })
  }

  calcula(){
    //ajustando horario inicial
    let hora1: string = this.gradeForm.get('horaInicial').value;
    let hora2 = this.gradeForm.get('horaFinal').value;
    let inter = this.gradeForm.get('intervalo').value;


      let horaIni1 = hora1.substring(0,2);
      let horaFin1 = hora1.substring(3,5);

      let horaIni1Min = parseInt(horaIni1)*60;
      let horaFin1Int = parseInt(horaFin1);

      let totInMin = horaIni1Min + horaFin1Int;
      //console.log(totInMin);

      let horaIni2 = hora2.substring(0,2);
      let horaFin2 = hora2.substring(3,5);

      let horaIni2Min = parseInt(horaIni2)*60;
      let horaFin2Int = parseInt(horaFin2);

      let totFinMin = horaIni2Min + horaFin2Int;

      //console.log(totFinMin);

      let difHora = totFinMin - totInMin;
		  let difHoraI = difHora/60;
		  let difHoraM = difHora%60;
		  let media = difHora/inter;
		  let totalQuant = (difHora*media)/60;
		  let corVagas = difHora/totalQuant;

      /*console.log("Hora total: " + difHora);
      console.log("Hora: " +  difHoraI);
      console.log("Minutos: " + difHoraM);
      console.log("Media por hora: " + media);
      console.log("Quantidade: " + totalQuant);
      console.log("corração de vagas: " + corVagas);*/

      this.horaTotal = difHoraI;
      this.minutoTotal = difHoraM;
      this.mediaAtenHora = Math.trunc(media);
      this.totAtend = Math.trunc(totalQuant);
      this.corrVaga = Math.trunc(corVagas);

    this.gradeForm.get('quantidade').setValue(Math.trunc(totalQuant));
    this.gradeForm.get('correcaoHora').setValue(Math.trunc(corVagas));
    //this.gradeForm.get('configurado').setValue("c");
    //this.gradeForm.get('gerado').setValue("n");
  }

  updateGradeForm(grade){
    this.gradeForm.patchValue(grade);
  }


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

  comboBox(){
      this.calendarioService.listarDiasAtivos().subscribe(
        dados=> this.calendarios = dados
      );

      this.unidadeService.listUnidadeGenerica(this.globalService.getRole(), this.globalService.getUnidadeId()).subscribe(
        dados=> this.unidades = dados
      );

      this.servicoService.listServico().subscribe(
        dados=> this.servicos = dados
      );
  }

  onSubmit(){
    if(this.gradeForm.valid){
        this.gradeService.save(this.gradeForm.value).subscribe(
          success => {this.globalService.saveShow("Gerado com Sucesso!", "Grade") }
        )
    }
    this.gradeForm.reset();
    this.horaTotal = "";
    this.minutoTotal = "";
    this.mediaAtenHora = "";
    this.totAtend = "";
    this.corrVaga = "";
  }
}
