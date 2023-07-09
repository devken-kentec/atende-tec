import { GlobalService } from './../../shared/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MuralService } from '../shared/mural.service';

@Component({
  selector: 'app-mural-list',
  templateUrl: './mural-list.component.html',
  styleUrls: ['./mural-list.component.css'],
  preserveWhitespaces: true
})
export class MuralListComponent implements OnInit {

  murais:[]
  _id: string;
  _titulo: string;

  constructor(private muralService: MuralService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.findByAll();
  }

  findByAll(){
    this.muralService.findByAll().subscribe((res:any) => {
        this.murais = res
    });
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  pegarDados(id, titulo){
    this._id = id;
    this._titulo = titulo;
  }

  onDelete(){
    this.muralService.remove(this._id).subscribe(
      success => {
        this.globalService.removeShow("Removido com Sucesso!", "Mensagem"),
        this.findByAll()
      }
    );
  }
}
