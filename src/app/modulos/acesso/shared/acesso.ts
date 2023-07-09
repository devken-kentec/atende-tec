import { Role } from './role';
import { Unidade } from './../../unidade/shared/unidade';
import { Servidor } from '../../servidor/shared/servidor';

export interface Acesso {
    id: number;
    senha: string;
    servidor: Servidor;
    unidade: Unidade;
    role: Role;
}