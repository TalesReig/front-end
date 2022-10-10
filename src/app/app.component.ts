import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from './auth/services/local-storage.service';
import { UsuarioService } from './core/services/usuario.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'front-end';

  constructor(
    titulo: Title,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService
    ) {
    titulo.setTitle("Início - eAgenda")
    this.logarUsuarioPersistido();
  }

  private logarUsuarioPersistido(){
    const usuariopersistido = this.localStorageService.obterUsuarioLogado();

    if(usuariopersistido)
      this.usuarioService.logarUsuario(usuariopersistido);
  }
}
