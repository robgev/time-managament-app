import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { UserRole } from '../types/User.d';

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

    @Column()
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
