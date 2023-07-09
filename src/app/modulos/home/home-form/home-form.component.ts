import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

  horaAtual: string;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {

  }

  pegarNome(){
    let nome: string = this.globalService.getNome();
    return nome;
  }
}
