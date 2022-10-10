import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TarefaService } from '../services/tarefa.service';
import { FormsTarefaViewModel, ItemTarefaViewModel } from '../view-models/forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styles: [
  ]
})
export class InserirTarefaComponent implements OnInit {
  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object.values(PrioridadeTarefaEnum)
    .filter(v => !Number.isFinite(v));

  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  constructor(
    titulo: Title, // para setar o titulo da pg
    private formBuilder: FormBuilder, //para instanciar o formulario
    private tarefaService: TarefaService,// insere a tarefa
    private router: Router //encaminha a pessoa para a rota desejada
  ) {
    titulo.setTitle('Cadastrar Tarefa - eAgenda');
  }

  ngOnInit(): void {
    //form Tarefa
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]],
    });

    //form Itens da Tarefa
    this.formItens = this.formBuilder.group({
      tituloItem: ['']
    });
  }

  get titulo() {
    return this.formTarefa.get('titulo');
  }

  get prioridade() {
    return this.formTarefa.get('prioridade');
  }

  get tituloItem() {
    return this.formItens.get('tituloItem');
  }

  public adicionarItem(): void {
    if (this.tituloItem) {
      //preenhendo item da tarefa
      let item = new ItemTarefaViewModel();
      item.titulo = this.tituloItem.value;
      item.status = StatusItemTarefa.Adicionado;

      //inserindo item na tarefa
      this.tarefaFormVM.itens.push(item);

      //limpando o campo
      this.formItens.reset();
    }
  }

  public removerItem(item: ItemTarefaViewModel): void {
    this.tarefaFormVM.itens.forEach((x, index) => {// x objeto index = index do objeto para facilitar a manipulação do array
      if (x === item)
        this.tarefaFormVM.itens.splice(index, 1); //splice remove no valor inicial eté a quantidade informada ou seja, remove apenas ele
    })
  }

  public gravar() {
    if (this.formTarefa.invalid) return;

    this.tarefaFormVM = Object.assign({}, this.tarefaFormVM, this.formTarefa.value);

    this.tarefaService.inserir(this.tarefaFormVM)
      .subscribe({
        next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsTarefaViewModel): void {
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }

}
