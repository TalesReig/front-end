import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TarefaService } from '../services/tarefa.service';
import { ListarTarefaViewModel } from '../view-models/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styles: [
  ]
})
export class ListarTarefaComponent implements OnInit {
  public tarefas$: Observable<ListarTarefaViewModel[]>

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.tarefas$ =  this.tarefaService.selecionarTodos();
  }

}
