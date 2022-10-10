import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { UsuarioService } from '../core/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public usuarioLogado$: Observable<UsuarioTokenViewModel | null>;

  constructor(titulo: Title, private usuarioService: UsuarioService){
    titulo.setTitle('Dashboard | eAgenda');
  }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }

}
