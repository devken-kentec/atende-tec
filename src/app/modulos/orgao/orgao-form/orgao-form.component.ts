import { GlobalService } from './../../shared/global.service';
import { OrgaoService } from './../shared/orgao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orgao-form',
  templateUrl: './orgao-form.component.html',
  styleUrls: ['./orgao-form.component.css']
})
export class OrgaoFormComponent implements OnInit {

  orgaoForm: FormGroup;
  mostrarMens: boolean = false;

  constructor(private fb: FormBuilder,
              private orgaoService: OrgaoService,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;
      if(routeParans.id != null){
          this.orgaoService.loadById(routeParans.id).subscribe((orgao: any)=>{
                this.updateOrgaoForm(orgao);
          });
      }

    this.orgaoForm = this.fb.group({
      id: [null, []],
      sigla: ['', []],
      codigo: ['', []],
      descricao: ['', []]
    });
  }

  updateOrgaoForm(orgao){
      this.orgaoForm.patchValue(orgao);
  }
  onSumit(){
      if (this.orgaoForm.valid){
          this.orgaoService.save(this.orgaoForm.value).subscribe(
            success => { this.globalService.saveShow('Salvo com Sucesso!', 'Orgão') }
          );
      }
      this.orgaoForm.reset();
  }
}
