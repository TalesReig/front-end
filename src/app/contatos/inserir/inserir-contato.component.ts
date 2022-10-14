import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styles: [
  ]
})
export class InserirContatoComponent implements OnInit {

  public formContato: FormGroup;

  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title, // para setar o titulo da pg
    private formBuilder: FormBuilder, //para instanciar o formulario
    private contatoService: ContatoService,// insere a contato
    private router: Router //encaminha a pessoa para a rota desejada
  ) {
    titulo.setTitle('Cadastrar Contato - eAgenda');
  }

  ngOnInit(): void {
    //form Contato
    this.formContato = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone:	new FormControl("", [Validators.required, Validators.pattern(/^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4}$/)]),
      empresa: [''],
      cargo: [''],
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }

  get email() {
    return this.formContato.get('email');
  }

  get telefone() {
    return this.formContato.get('telefone');
  }

  get empresa() {
    return this.formContato.get('empresa');
  }

  get cargo() {
    return this.formContato.get('cargo');
  }

  public gravar() {
    if (this.formContato.invalid) return;

    this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

    this.contatoService.inserir(this.contatoFormVM)
      .subscribe({
        next: (contatoInserida) => this.processarSucesso(contatoInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(contato: FormsContatoViewModel): void {
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }

}
