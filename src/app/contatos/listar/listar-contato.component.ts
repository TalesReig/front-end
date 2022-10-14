import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoService } from '../services/contato.service';
import { ListarContatoViewModel } from '../view-models/listar-contatos.view-models';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html',
  styles: [
  ]
})
export class ListarContatoComponent implements OnInit {

  public contatos$: Observable<ListarContatoViewModel[]>

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.contatos$ =  this.contatoService.selecionarTodos();
  }
}
