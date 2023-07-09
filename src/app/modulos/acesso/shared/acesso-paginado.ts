import { Acesso } from "./acesso";

export interface AcessoPaginado {

  content: Acesso[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
