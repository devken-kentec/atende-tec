import { GlobalService } from './../../shared/global.service';
import { GradeService } from './../shared/grade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-liberacao-form',
  templateUrl: './grade-liberacao-form.component.html',
  styleUrls: ['./grade-liberacao-form.component.css']
})
export class GradeLiberacaoFormComponent implements OnInit {

  gradeLibForm: FormGroup;

  constructor(private fb: FormBuilder,
              private gradeService: GradeService,
              private globalService: GlobalService) { }

  ngOnInit(): void {

    this.gradeLibForm = this.fb.group({
      gradeId: ['', [Validators.required]]
    })

  }

  liberarGrade(){
    if(this.gradeLibForm.valid){
      this.gradeService.liberarGrade(this.gradeLibForm.get("gradeId").value).subscribe(
        success => { this.globalService.saveShow("Liberada com Sucesso!","Grade")},
        erro => { this.globalService.alertShow("Alguma coisa errada!","OPS!")}
      );
    }
  }

}
