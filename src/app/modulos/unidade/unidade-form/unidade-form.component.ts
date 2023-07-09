import { GlobalService } from './../../shared/global.service';
import { UnidadeService } from './../shared/unidade.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrls: ['./unidade-form.component.css']
})
export class UnidadeFormComponent implements OnInit {

  mostrarMens: boolean = false;
  unidadeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private unidadeService: UnidadeService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }



  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;
      if(routeParans.id != null){
          this.unidadeService.loadById(routeParans.id).subscribe((unidade: any)=>{
              this.updateUnidadeForm(unidade)
          })
      }

    this.unidadeForm = this.fb.group({
        id:[null, []],
        codigo: ['',[]],
        descricao: ['', Validators.required],
        endereco: ['',[]],
        sigla: ['',[]],
        telefone: ['',[]]
    });
  }

  updateUnidadeForm(unidade){
      this.unidadeForm.patchValue(unidade);
  }

  onSumit(){
      if(this.unidadeForm.valid){
          this.unidadeService.save(this.unidadeForm.value).subscribe(
            success => { this.globalService.saveShow('Salvo com Sucesso!', 'Unidade') }
          )
      }
      this.unidadeForm.reset();
  }
}
