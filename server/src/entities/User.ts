import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';

export enum UserRole {
  ADMIN = 2,
  MANAGER = 1,
  USER = 0,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ length: 25 })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    preferredWorkingHoursPerDay: number;

    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role: UserRole

    @OneToMany(() => Task, (task) => task.byUser)
    tasks: Task[];
}
