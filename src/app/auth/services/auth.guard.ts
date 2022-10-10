import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { UsuarioService } from "src/app/core/services/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> {
    return this.usuarioService.usuarioLogado.pipe(
      map(usuarioLogado => {
        if(usuarioLogado)
          return true;

        this.router.navigate(['/conta/autenticar']);
        return false;
      })
    )
  }

}
