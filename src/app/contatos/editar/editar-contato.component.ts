import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styles: [
  ]
})
export class EditarContatoComponent implements OnInit {

  public formContato: FormGroup;

  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService
  ) {
    titulo.setTitle('Editar Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];//carrega os dados da contato

    //form Contato
    this.formContato = this.fb.group({
      //id: [''],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      empresa: [''],
      cargo: [''],
    });

    this.formContato.patchValue({ // atualiza parcialmente os valores do contato
      //id: this.contatoFormVM.id,
      nome: this.contatoFormVM.nome,
      email: this.contatoFormVM.email,
      telefone: this.contatoFormVM.telefone,
      cargo: this.contatoFormVM.cargo,
      empresa: this.contatoFormVM.empresa
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


    this.contatoService.editar(this.contatoFormVM)
      .subscribe({
        next: (contatoEditada) => this.processarSucesso(contatoEditada),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(contato: FormsContatoViewModel) {
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }
}
