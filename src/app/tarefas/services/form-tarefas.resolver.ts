import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FormsTarefaViewModel } from "../view-models/forms-tarefa.view-model";
import { TarefaService } from "./tarefa.service";

@Injectable()
export class FormsTarefaResolver implements Resolve<FormsTarefaViewModel>{

  constructor(private tarefaService: TarefaService){ }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsTarefaViewModel> {
    return this.tarefaService.selecionarPorId(route.params['id']);
  }

}
