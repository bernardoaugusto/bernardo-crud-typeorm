import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from './metadata/RelationalTenantid';

export interface MaterialTreeNodeInterface extends RelationalTenantidInterface {
    code: string;
    level_id: string;
    category_id: string;
    material_id: string;
}

export interface MaterialTreeNodeRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    code?: string;
    level_id?: string;
    category_id?: string;
    material_id?: string;
}
