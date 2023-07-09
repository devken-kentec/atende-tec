import { Orgao } from "./orgao";

export interface OrgaoPaginada {

  content: Orgao[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
