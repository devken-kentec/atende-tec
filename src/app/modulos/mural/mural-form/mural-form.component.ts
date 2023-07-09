import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../shared/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MuralService } from '../shared/mural.service';

@Component({
  selector: 'app-mural-form',
  templateUrl: './mural-form.component.html',
  styleUrls: ['./mural-form.component.css']
})
export class MuralFormComponent implements OnInit {

  muralForm: FormGroup;

  constructor(private fb: FormBuilder,
              private muralService: MuralService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

    this.muralForm = this.fb.group({
      id: ['',[]],
      titulo: ['',[]],
      statusMensagem: ['',[]],
      mensagem: ['',[]]
    });
  }

  findById(id){
    this.muralService.findById(id).subscribe((dados:any)=>{
      this.updateMuralForm(dados);
    });
  }

  updateMuralForm(mural){
    this.muralForm.patchValue(mural);
  }
  send(){
    if(this.muralForm.valid){
      this.muralService.save(this.muralForm.value).subscribe(
        success => { this.globalService.saveShow("Post enviado com Sucesso!", "Mural")}
      );
    }
  }

}
