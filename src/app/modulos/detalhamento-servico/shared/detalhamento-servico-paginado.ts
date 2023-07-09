import { DetalhamentoServico } from "./detalhamento-servico";

export interface DetalhamentoServicoPaginado {

  content: DetalhamentoServico[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
