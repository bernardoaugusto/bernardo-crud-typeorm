import { Repository, getRepository } from 'typeorm';
import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import MaterialTreeKnot from '../entities/MaterialTreeKnot';
import { MaterialTreeKnotInterface } from '../../../../dtos/IMaterialTreeKnotDTO';
import IMaterialTreeKnotRepository from '../../../../repositories/MaterialTreeKnotRepository';

export default class MaterialTreeKnotRepository
    implements IMaterialTreeKnotRepository {
    private ormRepository: Repository<MaterialTreeKnot>;

    constructor() {
        this.ormRepository = getRepository(MaterialTreeKnot);
    }

    public async createAndSave(
        materialTreeKnotData: MaterialTreeKnotInterface,
    ): Promise<MaterialTreeKnot> {
        const materialTreeKnot = this.ormRepository.create(materialTreeKnotData);

        return this.ormRepository.save(materialTreeKnot);
    }

    public async findById(
        id: string,
        tenantid: string,
    ): Promise<MaterialTreeKnot | undefined> {
        return this.ormRepository.findOne({ where: { id, tenantid } });
    }

    public async getAllWithPagination(
        options: typeorm.OptionsTypeOrmGetAllWithPagination,
    ): Promise<{ data: MaterialTreeKnot[]; count: number }> {
        const [data, count] = await this.ormRepository.findAndCount(options);

        return { data, count };
    }

    public async getAllWithoutPagination(
        options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
    ): Promise<MaterialTreeKnot[]> {
        return this.ormRepository.find(options);
    }
}
