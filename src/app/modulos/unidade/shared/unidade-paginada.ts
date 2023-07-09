import { Unidade } from "./unidade";

export interface UnidadePaginada {

  content: Unidade[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
