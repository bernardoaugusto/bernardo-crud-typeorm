import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RelationalTenantidInterface } from '../../../../../../common/dtos/RelationalTenantid';

@Entity('table-name')
export default class TableName extends RelationalTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    test_number: number;

    @Column()
    number: number;
}
