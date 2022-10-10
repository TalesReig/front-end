import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { RegistrarUsuarioViewModel } from '../view-models/registrar-usuario.view-model';
import { TokenViewModel } from '../view-models/token.view-model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
  public form: FormGroup;

  private registroVM: RegistrarUsuarioViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private router: Router //adcionar o RoutModule no authModule
    ) {
    titulo.setTitle('Registro - eAgenda')
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // == new FormControl()
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],

    })
  }

  get nome(){
    return this.form.get('nome');
  }

  get email(){
    return this.form.get('email');
  }

  get senha(){
    return this.form.get('senha');
  }

  get confirmarSenha(){
    return this.form.get('confirmarSenha');
  }

  public registrar(){
    if(this.form.invalid)
      return

    this.registroVM = Object.assign({},this.registroVM, this.form.value);

    this.authService.registrarUsuario(this.registroVM)
      .subscribe({
        next: (registroRealizado) => this.processarSucesso(registroRealizado),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(registroRealizado: TokenViewModel){
    this.localStorageService.salvarDadosLocalUsuario(registroRealizado);
    this.usuarioService.logarUsuario(registroRealizado.usuarioToken);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: any){
    console.log(erro)
  }
}
