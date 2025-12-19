import { Intervention } from 'src/interventions/entities/intervention.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


//enumeration : user ynajem ykoun ADMIN wela TECHnicien
export enum UserRole {
  ADMIN = 'ADMIN',
  TECH = 'TECH',
}

@Entity() // cet classe est uun table SQL
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // clé primaire

  @Column({
    unique: true,
  })
  email: string; // email unique

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH,
  })
  role: UserRole;

//user 3ndou des interventions
 @OneToMany(() => Intervention, (intervention) => intervention.technician)
interventions: Intervention[];


}
