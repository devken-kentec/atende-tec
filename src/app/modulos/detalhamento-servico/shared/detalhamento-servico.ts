import { Servico } from '../../servico/shared/servico';

export interface DetalhamentoServico {
    id: number;
    descricao: string;
    detalhamento: string;
    vinculo: string;
    servico: Servico;
}
