import { PrioridadeTarefaEnum } from "./prioridade-tarefa.enum";

export class VisualizarTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;

  dataCriacao: Date;
  percentualConcluido: number;

  itens: VisualizarItemTarefaViewModel[] = [];
}

export class VisualizarItemTarefaViewModel {
  titulo: string;
  concluido: boolean;
}
