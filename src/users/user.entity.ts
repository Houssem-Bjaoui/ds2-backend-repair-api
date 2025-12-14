import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
