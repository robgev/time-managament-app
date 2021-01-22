import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    workedOn: string;

    @Column()
    workedWhen: Date;

    @Column()
    duration: number;

    @ManyToOne(() => User, (user) => user.tasks)
    byUser: User;
}
