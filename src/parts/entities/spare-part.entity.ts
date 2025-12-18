import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column('decimal')
  price: number;
}
