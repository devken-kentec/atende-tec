import { Servico } from './../../servico/shared/servico';
import { Unidade } from './../../unidade/shared/unidade';
import { Calendario } from './../../calendario/shared/calendario';

export interface Grade {
    id: Number;
    calendario: Calendario;
    horaInicial: string;
    horaFinal: string;
    intervalo: string;
    quantidade: string;
    correcaoHora: string;
    configurado: string;
    gerado: string;
    unidade: Unidade;
    servico: Servico; 
}