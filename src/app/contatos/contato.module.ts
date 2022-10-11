import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoAppComponent } from './contato-app.component';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [
    ContatoAppComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule
  ]
})
export class ContatoModule { }
