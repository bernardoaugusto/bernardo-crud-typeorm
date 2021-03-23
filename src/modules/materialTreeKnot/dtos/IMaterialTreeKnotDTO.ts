import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from '../../../common/dtos/RelationalTenantid';

export interface MaterialTreeKnotInterface extends RelationalTenantidInterface {
    code: string;
    level_id: string;
    category_id: string;
    material_id: string;
}

export interface MaterialTreeKnotRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    code?: string;
    level_id?: string;
    category_id?: string;
    material_id?: string;
}
