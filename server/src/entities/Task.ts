import {
  Entity,
  Column,
  ManyToOne,
  RelationId,
  PrimaryGeneratedColumn,
  JoinColumn,
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

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'byUserId' })
    byUser: User;

    @RelationId((task: Task) => task.byUser)
    byUserId: number;
}
