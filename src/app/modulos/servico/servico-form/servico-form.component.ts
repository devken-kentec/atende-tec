import { GlobalService } from './../../shared/global.service';
import { OrgaoService } from './../../orgao/shared/orgao.service';
import { ServicoService } from './../shared/servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Orgao } from '../../orgao/shared/orgao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  servicoForm: FormGroup;
  mostrarMens: boolean = false;
  orgaos: Orgao[];



  constructor(private fb: FormBuilder,
              private servicoService: ServicoService,
              private orgaoService: OrgaoService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.comboBox();

    const routeParans = this.route.snapshot.params;
    if(routeParans.id != null){
        this.servicoService.loadById(routeParans.id).subscribe((servico:any)=>{
              this.updateServicoForm(servico)
        });
    }

    this.servicoForm = this.fb.group({
        id:[null, []],
        sigla: ['',[]],
        descricao: ['',[]],
        orgao: this.fb.group({
          id:[null, []],
          descricao: ['',[]]
        })
    });
  }

  updateServicoForm(servico){
      this.servicoForm.patchValue(servico);
  }

  comboBox(){
    this.orgaoService.listOrgao().subscribe(
      dados => this.orgaos = dados
    );
  }

  onSumit(){
      if(this.servicoForm.valid){
        this.servicoService.save(this.servicoForm.value).subscribe(
            success => { this.globalService.saveShow('Salvo com Sucesso', 'Serviço') }
        )
      }
      this.servicoForm.reset();
  }

}
