import { Contribuinte } from './../../contribuinte/shared/contribuinte';
import { DetalhamentoServico } from './../../detalhamento-servico/shared/detalhamento-servico';
import { Grade } from '../../grade/shared/grade';

export interface Agendamento {
    id: number;
    horario: string;
    sequencial: string;
    prioridade: string;
    senha: string;
    statusAgendamento: string;
    grade: Grade;
    detalhamentoServico: DetalhamentoServico;
    contribuinte: Contribuinte;
}
