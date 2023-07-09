import { GlobalService } from './../../shared/global.service';
import { GuicheService } from './../shared/guiche.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guiche-form',
  templateUrl: './guiche-form.component.html',
  styleUrls: ['./guiche-form.component.css']
})
export class GuicheFormComponent implements OnInit {

  guicheForm: FormGroup;
  mostrarMens: boolean = false;

  constructor(private fb: FormBuilder,
              private guicheService: GuicheService,
              private route: ActivatedRoute,
              private globalService: GlobalService ) { }

  ngOnInit(): void {
    const routeParans = this.route.snapshot.params;
    if(routeParans.id != null){
        this.guicheService.loadById(routeParans.id).subscribe((guiche: any)=>{
            this.updateGuicheForm(guiche)
        });
    }

    this.guicheForm = this.fb.group({
      id: [null, []],
      descricao: ['', []]
    });
  }

    updateGuicheForm(guiche){
      this.guicheForm.patchValue(guiche);
    }

    onSumit(){
      if(this.guicheForm.valid){
        this.guicheService.save(this.guicheForm.value).subscribe(
          success => { this.globalService.saveShow('Salvo com Sucesso!', 'Guichê') }
        );
      }
      this.guicheForm.reset();
    }
}
