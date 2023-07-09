import { UploadService } from './../shared/upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  uploadForm: FormGroup;
  enviadoCalendario: boolean = false;
  enviadoGrade: boolean = false;
  enviadoServico: boolean = false;
  enviadoDetalheServico: boolean = false;
  enviadoUnidade: boolean = false;
  enviadoOrgao: boolean = false;
  enviadoServidor: boolean = false;

  constructor(private fb: FormBuilder,
              private uploadService: UploadService) { }

  ngOnInit(): void {

    this.uploadForm = this.fb.group({
        calendario: ['', []],
        grade: ['', []],
        servico: ['', []],
        detalheServico: ['', []],
        unidade: ['', []],
        orgao: ['', []],
        servidor: ['', []]
    });
  }

  tamanhoCalendario(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoCalendario').innerHTML = tamanho;
  }

  uploadCalendario(){
    var cal: string;
    cal = this.uploadForm.get('calendario').value;
    var novaCal: string = cal.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadCalendario(novaCal).subscribe(
      success => { this.enviadoCalendario = true }
    );
  }

  tamanhoGrade(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoGrade').innerHTML = tamanho;
  }

  uploadGrade(){
    var gra: string;
    gra = this.uploadForm.get('grade').value;
    var novaGra: string = gra.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadGrade(novaGra).subscribe(
      success => { this.enviadoGrade = true }
    );
  }

  tamanhoServico(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoServico').innerHTML = tamanho;
  }

  uploadServico(){
    var ser: string;
    ser = this.uploadForm.get('servico').value;
    var novaSer: string = ser.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadServico(novaSer).subscribe(
      success => { this.enviadoServico = true }
    );
  }

  tamanhoDetalheServico(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoDetalheServico').innerHTML = tamanho;
  }

  uploadDetalheServico(){
    var detSer: string;
    detSer = this.uploadForm.get('detalheServico').value;
    var novaDetSer: string = detSer.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadDetalheServico(novaDetSer).subscribe(
      success => { this.enviadoDetalheServico = true }
    );
  }

  tamanhoUnidade(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoUnidade').innerHTML = tamanho;
  }

  uploadUnidade(){
    var uni: string;
    uni = this.uploadForm.get('unidade').value;
    var novaUni: string = uni.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadUnidade(novaUni).subscribe(
      success => { this.enviadoUnidade = true }
    );
  }

  tamanhoOrgao(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoOrgao').innerHTML = tamanho;
  }

  uploadOrgao(){
    var org: string;
    org = this.uploadForm.get('orgao').value;
    var novaOrg: string = org.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadOrgao(novaOrg).subscribe(
      success => { this.enviadoOrgao = true }
    );
  }

  tamanhoServidor(event){
    var selectedFiles = <FileList>event.srcElement.files;
    var tamanho: any =  selectedFiles[0].size;
    document.getElementById('tamanhoServidor').innerHTML = tamanho;
  }

  uploadServidor(){
    var ser: string;
    ser = this.uploadForm.get('servidor').value;
    var novaSer: string = ser.replace("C:\\fakepath\\", "C:\\upload\\");

    this.uploadService.uploadServidor(novaSer).subscribe(
      success => { this.enviadoServidor = true }
    );
  }


}
