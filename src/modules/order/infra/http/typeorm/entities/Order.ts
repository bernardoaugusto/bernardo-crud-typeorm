import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export default class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column()
    cpf: number;

}
