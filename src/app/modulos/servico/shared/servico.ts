import { Orgao } from '../../orgao/shared/orgao';

export interface Servico {
    id: number;
    sigla: string;
    descricao: string;
    orgao: Orgao;
}