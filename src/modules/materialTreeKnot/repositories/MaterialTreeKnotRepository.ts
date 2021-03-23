import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import MaterialTreeKnot from '../infra/http/typeorm/entities/MaterialTreeKnot';
import { MaterialTreeKnotInterface } from '../dtos/IMaterialTreeKnotDTO';
export default interface IMaterialTreeKnotRepository {
    createAndSave(
        materialTreeKnotData: MaterialTreeKnotInterface,
    ): Promise<MaterialTreeKnot>;
    findById(id: string, tenantid: string): Promise<MaterialTreeKnot | undefined>;
    getAllWithPagination(
        options: typeorm.OptionsTypeOrmGetAllWithPagination,
    ): Promise<{ data: MaterialTreeKnot[]; count: number }>;
    getAllWithoutPagination(options: typeorm.OptionsTypeOrmGetAllWithoutPagination): Promise<MaterialTreeKnot[]>;
}

