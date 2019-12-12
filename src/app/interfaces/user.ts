import { Observable } from 'rxjs/Observable';
export interface User {
    id?: string;
    nome?: string;
    sobrenome?:string;
    email?: string;
    telefone?: string;
    cadastur?: string;
    linguas?: string;
    password?: string;
    ativo?: boolean;
    plantao?: boolean;
    foto?: string;
    avaliacao?: number;
}
