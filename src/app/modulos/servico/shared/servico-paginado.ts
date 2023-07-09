import { Servico } from "./servico";

export interface ServicoPaginado {

  content: Servico[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
