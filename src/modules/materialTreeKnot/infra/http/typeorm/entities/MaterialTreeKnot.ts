import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { RelationalTenantidEntity } from '../../../../../../common/typeorm/entities/RelationalTenantidEntity';

@Entity('material-tree-knot')
export default class MaterialTreeKnot extends RelationalTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    level_id: string;

    @Column()
    category_id: string;

    @Column()
    material_id: string;

}
