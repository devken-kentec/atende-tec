import { Agendamento } from './agendamento';

export interface AgendaPaginada {

    content: Agendamento[];
    totalElements: number;
    size: number;
    number: number;
    totalPages: number;

}