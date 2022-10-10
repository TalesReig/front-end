import { PrioridadeTarefaEnum } from "./prioridade-tarefa.enum"
import { StatusItemTarefa } from "./status-item-tarefa.enum";

export class FormsTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[] = [];
}

export class ItemTarefaViewModel {
  id: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;
}
