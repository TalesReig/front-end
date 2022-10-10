import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UsuarioTokenViewModel } from "src/app/auth/view-models/token.view-model";

@Injectable()
export class UsuarioService {

  private usuarioSubject: BehaviorSubject<UsuarioTokenViewModel | null>;

  constructor(){
    this.usuarioSubject = new BehaviorSubject<UsuarioTokenViewModel | null>(null);
  }

  get usuarioLogado(): Observable<UsuarioTokenViewModel | null>{
    return this.usuarioSubject.asObservable();
  }

  public logarUsuario(usuario: UsuarioTokenViewModel): void {
    this.usuarioSubject.next(usuario);
  }

  public logout(): void {
    this.usuarioSubject.next(null);
  }
}
