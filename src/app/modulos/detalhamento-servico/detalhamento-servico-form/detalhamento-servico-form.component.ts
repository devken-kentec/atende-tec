import { GlobalService } from './../../shared/global.service';
import { DetalhamentoServicoService } from './../shared/detalhamento-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../servico/shared/servico';
import { ServicoService } from '../../servico/shared/servico.service';

@Component({
  selector: 'app-detalhamento-servico-form',
  templateUrl: './detalhamento-servico-form.component.html',
  styleUrls: ['./detalhamento-servico-form.component.css']
})
export class DetalhamentoServicoFormComponent implements OnInit {

  mostrarMens: boolean = false;
  detalhamentoServicoForm: FormGroup;
  servicos: Servico[];

  constructor(private fb: FormBuilder,
              private detalhamentoServicoService: DetalhamentoServicoService,
              private servicoService: ServicoService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.comboBox();

    const routeParans = this.route.snapshot.params;

    if(routeParans.id != null){
        this.detalhamentoServicoService.loadById(routeParans.id).subscribe((detServico: any)=>{
          this.updateDetServicoForm(detServico)
        })
    }

    this.detalhamentoServicoForm = this.fb.group({
      id:[null, []],
      descricao: ['',[]],
      detalhamento: ['',[]],
      vinculo: ['',[]],
      servico: this.fb.group({
        id:[null, []],
        descricao: ['',[]]
      })
  });
  }

  comboBox(){
    this.servicoService.listServico().subscribe(
      dados => this.servicos = dados
    );
  }

  updateDetServicoForm(detServico){
      this.detalhamentoServicoForm.patchValue(detServico);
  }
  onSumit(){
        if(this.detalhamentoServicoForm.valid){
          this.detalhamentoServicoService.save(this.detalhamentoServicoForm.value).subscribe(
            success => { this.globalService.saveShow('Salvo com Sucesso!', 'Detalhamento de Serviço') }
          )
        }
        this.detalhamentoServicoForm.reset();
  }

}
