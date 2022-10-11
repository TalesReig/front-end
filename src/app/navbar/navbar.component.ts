import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { LocalStorageService } from '../auth/services/local-storage.service';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { UsuarioService } from '../core/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  public estaColapsada: boolean = false;

  public usuarioLogado$: Observable<UsuarioTokenViewModel | null>;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }

  public sair(){
    this.authService.logout().subscribe({
      next: () => this.processarLogout()
    });
  }

  private processarLogout(){
    this.usuarioService.logout();
    this.localStorageService.limparDadosLocais();
    this.router.navigate(['/conta/autenticar'])
  }
}
