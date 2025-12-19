import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity} from '../../users/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { SparePart } from '../../parts/entities/spare-part.entity';

@Entity()
export class Intervention {
  // ID de l’intervention
  @PrimaryGeneratedColumn()
  id: number;

  // Date de l’intervention
  @Column()
  date: Date;

  // Description de la réparation
  @Column()
  description: string;

  // Technicien qui réalise l’intervention
  @ManyToOne(() => UserEntity, (user) => user.interventions)
  technician: UserEntity;

  // Appareil réparé
  @ManyToOne(() => Device)
  device: Device;

  // Pièces utilisées
  @ManyToMany(() => SparePart)
  @JoinTable()
  spareParts: SparePart[];
}
