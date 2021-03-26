import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

export interface IOrderRequestGetAllDTO extends typeorm.RequestGetAllInterface {
    code?: string;
    description?: string;
    cpf?: number;
}
