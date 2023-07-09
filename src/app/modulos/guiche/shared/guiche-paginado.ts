import { Guiche } from "./guiche";

export interface GuichePaginado {

  content: Guiche[];
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;

}
