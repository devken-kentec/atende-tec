import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../shared/servidor.service';

@Component({
  selector: 'app-servidor-form',
  templateUrl: './servidor-form.component.html',
  styleUrls: ['./servidor-form.component.css'],
  preserveWhitespaces: true
})
export class ServidorFormComponent implements OnInit {

  mostrarMens: boolean = false;
  servForm: FormGroup;
  btnSave: boolean = true;
  btnUpdate: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private servidorService: ServidorService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    let routeParams = this.route.snapshot.params;

    if(routeParams != null) {
      this.servidorService.loadByMatricula(routeParams.id).subscribe((servidor: any)=>{
          this.updateServForm(servidor),
          this.btnSave = false,
          this.btnUpdate = true
      });
    }

    this.servForm = this.fb.group({
      matricula: ["", [Validators.required]],
      nome: ["", [Validators.required]],
      cpf: ["", []],
      lotacao: ["", []],
      telefone: ["", []],
      email: ["", []],
      statusServidor: ["", [Validators.required]]
    });
  }

  updateServForm(servidor){
      this.servForm.patchValue(servidor);
  }

  onSubmit(){
    if(this.servForm.valid){
      this.servidorService.create(this.servForm.value).subscribe(
        success => { this.globalService.saveShow("Salvo com Sucesso!","Servidor") }
      );
    }
    this.servForm.reset();
  }

  onUpdate(){
    if(this.servForm.valid){
      this.servidorService.update(this.servForm.value).subscribe(
        success => { this.globalService.saveShow("Alteração feita Sucesso!","Servidor") }
      );
    }
    this.servForm.reset();
  }

}
